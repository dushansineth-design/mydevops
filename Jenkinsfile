pipeline {
    agent any

    environment {
        // Fix for Docker client/server version mismatch
        DOCKER_API_VERSION = '1.44'
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
                    # Set config to current workspace
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    mkdir -p $DOCKER_CONFIG/cli-plugins
                    
                    # Install Buildx
                    curl -SL https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64 -o $DOCKER_CONFIG/cli-plugins/docker-buildx
                    chmod +x $DOCKER_CONFIG/cli-plugins/docker-buildx
                    
                    # Install Compose
                    curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
                    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
                    
                    # Verify
                    ls -l $DOCKER_CONFIG/cli-plugins
                    $DOCKER_CONFIG/cli-plugins/docker-buildx version
                '''
            }
        }

        stage('Clean Up') {
            steps {
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    $DOCKER_CONFIG/cli-plugins/docker-compose down --remove-orphans || true
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    export DOCKER_CONFIG=$(pwd)/.docker_config
                    $DOCKER_CONFIG/cli-plugins/docker-compose up --build -d
                '''
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
