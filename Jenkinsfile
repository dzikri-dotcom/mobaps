pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    IMAGE_NAME = "dzikrilq/truth-or-dare-app"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh 'docker build -t $IMAGE_NAME:latest .'
        }
      }
    }

    stage('Login to Docker Hub') {
      steps {
        script {
          sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          sh 'docker push $IMAGE_NAME:latest'
        }
      }
    }

    stage('Deploy (Optional)') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }
  }
}
