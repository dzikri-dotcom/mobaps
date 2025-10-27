pipeline {
    agent any
    
    // VARIABEL DOCKER HUB DIUPDATE: Menggunakan username dzikri2811
    def dockerRepo = "dzikri2811/truth-or-dare-app" 
    def imageTag = "${env.BUILD_NUMBER}" 

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
                    // Menggunakan 'bat' untuk Windows: menjalankan docker build
                    bat "docker build -t ${dockerRepo}:${imageTag} ."
                    bat "docker tag ${dockerRepo}:${imageTag} ${dockerRepo}:latest"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                // Pastikan Kredensial di Jenkins memiliki ID: DOCKERHUB_CREDENTIALS_ID
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKERHUB_CREDENTIALS_ID', 
                    passwordVariable: 'DOCKER_PASSWORD', 
                    usernameVariable: 'DOCKER_USERNAME')]) {
                    
                    echo 'Logging into Docker Hub and pushing images...'
                    
                    // Menggunakan 'bat' dan sintaks variabel %VARIABLE% untuk Windows
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"
                    bat "docker push ${dockerRepo}:${imageTag}"
                    bat "docker push ${dockerRepo}:latest"
                }
            }
        }
        
        stage('Clean Up') {
            steps {
                echo 'Cleaning up local images...'
                // Menggunakan 'bat' untuk Windows
                bat "docker rmi ${dockerRepo}:${imageTag}"
                bat "docker rmi ${dockerRepo}:latest"
            }
        }
    }
}
