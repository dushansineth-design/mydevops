pipeline {
    agent any

    stages {
        stage('Build & Run Containers') {
            steps {
                bat 'docker compose down'
                bat 'docker compose up --build -d'
            }
        }
    }
}
