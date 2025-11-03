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
                echo 'Building Docker image...'
                // sh 'docker build -t users-count-app:1.0 .'
                sh 'docker build -t salzaidy/users-count-app:1.0 .'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying Docker image...'
                // Add deployment commands here
                withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push salzaidy/users-count-app:1.0'
                }
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