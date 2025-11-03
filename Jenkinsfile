pipeline {

    agent any

    stages {
        stage('initialize') {
            steps {
                // checkout scm
                echo 'Initializing...'
            }
        }
        stage('Test') {
            steps {
                // sh 'npm test'
                echo 'Running tests...'
            }
        }
        stage('BuildDockerImage') {
            steps {
                // sh 'npm install'
                // sh 'npm run build'
                echo 'Building Docker image...'
                sh 'docker build -t users-count-app:1.0 .'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying Docker image...'
                // Add deployment commands here
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}