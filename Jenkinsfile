pipeline {
    agent any

    environment {
        // Fix for Docker client/server version mismatch
        DOCKER_API_VERSION = '1.44'
        EC2_USER = 'ec2-user'
        EC2_HOST = '3.91.209.132'
        PROJECT_DIR = '/home/ec2-user/mydevops'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()       // Clean workspace
                checkout scm
                sh 'git log -1'   // Verify latest commit
            }
        }

        stage('Setup Docker Plugins') {
            steps {
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    rm -rf $DOCKER_CONFIG
                    mkdir -p $DOCKER_CONFIG/cli-plugins

                    # Buildx
                    curl -fSL https://github.com/docker/buildx/releases/download/v0.31.1/buildx-v0.31.1.linux-amd64 -o $DOCKER_CONFIG/cli-plugins/docker-buildx
                    chmod +x $DOCKER_CONFIG/cli-plugins/docker-buildx

                    # Compose
                    curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
                    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose

                    # Verify
                    $DOCKER_CONFIG/cli-plugins/docker-buildx version
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                // NOTE: Create a "Username with password" credential in Jenkins with ID 'docker-hub-creds'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        export DOCKER_CONFIG=$(pwd)/.docker_config
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    '''
                }
            }
        }

        stage('Clean Up Local Containers') {
            steps {
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    
                    # Try to clean up default project
                    $DOCKER_CONFIG/cli-plugins/docker-compose down --remove-orphans || true
                    # Try to clean up named project
                    $DOCKER_CONFIG/cli-plugins/docker-compose -p mydevops down --remove-orphans || true
                    
                    # Force kill any remaining containers holding our ports
                    docker rm -f $(docker ps -q --filter "publish=27017") 2>/dev/null || true
                    docker rm -f $(docker ps -q --filter "publish=5050") 2>/dev/null || true
                    docker rm -f $(docker ps -q --filter "publish=5174") 2>/dev/null || true
                '''
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        export DOCKER_CONFIG=$(pwd)/.docker_config
                        # Build images with username prefix
                        docker --config $DOCKER_CONFIG compose -p mydevops build
                        # Push images to Docker Hub
                        docker --config $DOCKER_CONFIG compose -p mydevops push
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // NOTE: You must create a "Secret File" credential in Jenkins with ID 'my-ec2-key' containing your pem file.
                withCredentials([
                    file(credentialsId: 'my-ec2-key', variable: 'PEM_KEY_FILE'),
                    usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')
                ]) {
                    sh """
                    # Unique key path to avoid collisions/permission issues
                    KEY_PATH="/tmp/deploy_key_${BUILD_NUMBER}.pem"
                    
                    # Ensure clean starts
                    rm -f \$KEY_PATH

                    # Secure local copy from credentials
                    cp "\$PEM_KEY_FILE" \$KEY_PATH
                    chmod 400 \$KEY_PATH

                    # Deploy with Clean Build (Pass DOCKER_USERNAME to EC2)
                    ssh -i \$KEY_PATH -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                    "export DOCKER_USERNAME='${DOCKER_USERNAME}' && cd ${PROJECT_DIR} && git fetch --all && git reset --hard origin/main && docker compose down && docker compose build --no-cache && docker compose up -d"
                    
                    # Cleanup key
                    rm -f \$KEY_PATH
                    """
                }
            }
        }

        stage('Health Check (EC2)') {
            steps {
                withCredentials([file(credentialsId: 'my-ec2-key', variable: 'PEM_KEY_FILE')]) {
                    sh """
                    KEY_PATH="/tmp/deploy_key_${BUILD_NUMBER}.pem"
                    rm -f \$KEY_PATH

                    cp "\$PEM_KEY_FILE" \$KEY_PATH
                    chmod 400 \$KEY_PATH

                    ssh -i \$KEY_PATH -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                    "docker ps"

                    rm -f \$KEY_PATH
                    """
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Build and Deployment Successful!"
            }
        }

        failure {
            script {
                echo "Build or Deployment Failed!"
            }
        }
    }
}
