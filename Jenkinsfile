pipeline {
    agent any

    environment {
        // Fix for Docker client/server version mismatch
        DOCKER_API_VERSION = '1.44'
        EC2_USER = 'ec2-user'
        EC2_HOST = '3.91.209.132'
        PROJECT_DIR = '/home/ec2-user/mydevops'
        // TODO: Replace with your actual Docker Hub username
        DOCKER_USERNAME = 'dushan2002'
        // TODO: Best practice is to use Jenkins Credentials. 
        // DO NOT COMMIT REAL TOKENS HERE. Set this env var in Jenkins Configuration.
        DOCKER_PASSWORD = 'your-dockerhub-access-token' 
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
                sh '''
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                '''
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
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    # Build images with username prefix
                    docker --config $DOCKER_CONFIG compose -p mydevops build
                    # Push images to Docker Hub
                    docker --config $DOCKER_CONFIG compose -p mydevops push
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                // NOTE: You must create a "Secret File" credential in Jenkins with ID 'my-ec2-key' containing your pem file.
                withCredentials([file(credentialsId: 'my-ec2-key', variable: 'PEM_KEY_FILE')]) {
                    sh """
                    # Secure local copy from credentials
                    cp "\$PEM_KEY_FILE" /tmp/deploy_key.pem
                    chmod 400 /tmp/deploy_key.pem

                    # Deploy with Clean Build
                    ssh -i /tmp/deploy_key.pem -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                    "cd ${PROJECT_DIR} && git fetch --all && git reset --hard origin/main && docker compose down && docker compose build --no-cache && docker compose up -d"
                    
                    # Cleanup key
                    rm -f /tmp/deploy_key.pem
                    """
                }
            }
        }

        stage('Health Check (EC2)') {
            steps {
                withCredentials([file(credentialsId: 'my-ec2-key', variable: 'PEM_KEY_FILE')]) {
                    sh """
                    cp "\$PEM_KEY_FILE" /tmp/deploy_key.pem
                    chmod 400 /tmp/deploy_key.pem

                    ssh -i /tmp/deploy_key.pem -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                    "docker ps"

                    rm -f /tmp/deploy_key.pem
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
