// pipeline {
//     agent any

//     stages {
//         stage('Build & Run Containers') {
//             steps {
//                 sh 'docker-compose down || true'
//                 sh 'docker-compose up --build -d'
//             }
//         }
//     }
// }


pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clean Up') {
            steps {
                echo 'Stopping and removing old containers...'
                sh 'docker-compose down --remove-orphans'
            }
        }

        stage('Build & Start Containers') {
            steps {
                echo 'Building images and starting containers...'
                sh 'docker-compose up --build -d'
            }
        }

        stage('Wait for Mongo') {
            steps {
                echo 'Waiting for MongoDB to be healthy...'
                sh '''
                for i in {1..30}; do
                    STATUS=$(docker inspect --format='{{.State.Health.Status}}' mydevops-mongo-1 || echo "starting")
                    echo "MongoDB status: $STATUS"
                    if [ "$STATUS" = "healthy" ]; then
                        echo "Mongo is ready!"
                        break
                    fi
                    sleep 2
                done
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                echo 'Listing running containers...'
                sh 'docker ps'
            }
        }
    }
}
