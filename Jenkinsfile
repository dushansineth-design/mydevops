pipeline {
    agent any

    stages {
        stage('Clean Up') {
            steps {
                sh 'docker-compose down --remove-orphans || true'
            }
        }

        stage('Build & Start Containers') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
