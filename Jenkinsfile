pipeline {
    agent any

    environment {
        // Fix for Docker client/server version mismatch
        DOCKER_API_VERSION = '1.44'
        // Force Docker to look for plugins in our local user directory
        DOCKER_CONFIG = "${HOME}/.docker"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Docker Plugins') {
            steps {
                sh '''
                    mkdir -p $DOCKER_CONFIG/cli-plugins
                    # Install Buildx
                    curl -SL https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64 -o $DOCKER_CONFIG/cli-plugins/docker-buildx
                    chmod +x $DOCKER_CONFIG/cli-plugins/docker-buildx
                    
                    # Install Compose (Ensure we have a working plugin)
                    curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
                    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
                '''
            }
        }

        stage('Clean Up') {
            steps {
                // Stop any running containers
                sh 'docker compose down --remove-orphans || true'
            }
        }

        stage('Setup Docker Plugins') {
            steps {
                sh '''
                    mkdir -p ~/.docker/cli-plugins
                    curl -SL https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
                    chmod +x ~/.docker/cli-plugins/docker-buildx
                '''
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
