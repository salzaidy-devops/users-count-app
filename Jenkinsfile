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
        stage('Build') {
            steps {
                // sh 'npm install'
                // sh 'npm run build'
                echo 'Building application...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
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