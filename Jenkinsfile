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

        stage('Deploy to EC2') {
            steps {
                sh """
                ssh -i "${PEM_PATH}" -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                "cd ${PROJECT_DIR} && git pull origin main && docker compose down && docker compose build --no-cache && docker compose up -d"
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
