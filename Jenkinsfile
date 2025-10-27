pipeline {
    agent any

    // Variabel didefinisikan dalam blok 'environment' untuk Pipeline Deklaratif
    environment {
        // Username Docker Hub Anda
        DOCKER_REPO = "dzikri2811/truth-or-dare-app" 
        // Menggunakan nomor build Jenkins sebagai tag image
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                echo 'Checking out code from Git...'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Menggunakan 'bat' untuk eksekusi perintah di Windows
                    bat "docker build -t ${DOCKER_REPO}:${IMAGE_TAG} ."
                    bat "docker tag ${DOCKER_REPO}:${IMAGE_TAG} ${DOCKER_REPO}:latest"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                // Kredensial Jenkins dengan ID: DOCKERHUB_CREDENTIALS_ID
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKERHUB_CREDENTIALS_ID', 
                    passwordVariable: 'DOCKER_PASSWORD', 
                    usernameVariable: 'DOCKER_USERNAME')]) {
                    
                    echo 'Logging into Docker Hub and pushing images...'
                    
                    // Menggunakan 'bat' dan sintaks variabel Windows %VARIABLE% untuk login
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"
                    bat "docker push ${DOCKER_REPO}:${IMAGE_TAG}"
                    bat "docker push ${DOCKER_REPO}:latest"
                }
            }
        }
        
        stage('Clean Up') {
            steps {
                echo 'Cleaning up local images...'
                bat "docker rmi ${DOCKER_REPO}:${IMAGE_TAG}"
                bat "docker rmi ${DOCKER_REPO}:latest"
            }
        }
    }
}
