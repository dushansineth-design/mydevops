pipeline {
    agent any

    stages {
        stage('Build & Run Containers') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up --build -d'
            }
        }
    }
}
