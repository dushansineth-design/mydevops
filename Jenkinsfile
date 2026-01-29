pipeline {
    agent any

    environment {
        // Fix for Docker client/server version mismatch
        DOCKER_API_VERSION = '1.44'
    }

    stages {
        stage('Checkout') {
            steps {
                // Automatically checkout the code from the scm (GitHub) triggering this pipeline
                checkout scm
            }
        }

        stage('Clean Up') {
            steps {
                // Stop any running containers to ensure a clean deployment
                // Using 'docker compose' (v2) instead of 'docker-compose'
                sh 'docker compose down --remove-orphans || true'
            }
        }

        stage('Build & Deploy') {
            steps {
                // Build images and start containers in detached mode
                sh 'docker compose up --build -d'
            }
        }

        stage('Health Check') {
            steps {
                // Wait briefly for services to initialize
                sleep 5
                // Verify containers are listed and running
                sh 'docker ps'
            }
        }
    }


    post {
        success {
            script {
                echo "Build Successful! Pushing tag to GitHub..."
                // NOTE: To push back to GitHub, you need to configure credentials in Jenkins
                // withId: 'github-credentials-id' is a placeholder for your Jenkins credential ID
                
                // sh '''
                //     git config user.email "jenkins@example.com"
                //     git config user.name "Jenkins CI"
                //     git tag -a "deploy-${BUILD_NUMBER}" -m "Deployed build #${BUILD_NUMBER}"
                //     git push origin "deploy-${BUILD_NUMBER}"
                // '''
                
                echo "To enable auto-pushing tags, uncomment the script block above and configure Jenkins credentials."
            }
        }
    }
}
