pipeline {
    agent any

    environment {
        // Fix for Docker client/server version mismatch
        DOCKER_API_VERSION = '1.44'
        EC2_USER = 'ec2-user'
        EC2_HOST = '3.91.209.132'
        PEM_PATH = 'D:/3D OBJECTS/WEB/SEM 5/DevOps/DevOps Web/primenova.pem'
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

        stage('Clean Up Local Containers') {
            steps {
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    $DOCKER_CONFIG/cli-plugins/docker-compose -p mydevops down --remove-orphans || true
                '''
            }
        }

        stage('Build Local Docker (Optional)') {
            steps {
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    docker --config $DOCKER_CONFIG compose -p mydevops up --build -d
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh """
                ssh -i "${PEM_PATH}" -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                "cd ${PROJECT_DIR} && git fetch --all && git reset --hard origin/main && docker compose down && docker compose build --no-cache && docker compose up -d"
                """
            }
        }

        stage('Health Check (EC2)') {
            steps {
                sh """
                ssh -i "${PEM_PATH}" -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                "docker ps"
                """
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
