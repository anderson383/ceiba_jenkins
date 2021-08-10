pipeline {
    agent any
    environment {
          // General Variables for Pipeline
          PROJECT_ROOT = 'Veterinaria'
      }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Checkout') {
            steps {
            // Get Github repo using Github credentials (previously added to Jenkins credentials)
            checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/anderson383/ceiba_jenkins']]])        }
        }
        stage('Install dependencies') {
            steps {
              sh 'npm --version'
              sh "cd ${PROJECT_ROOT}; npm install"
            }
        }
        stage('Unit tests') {
            steps {
              // Run unit tests
              sh "cd ${PROJECT_ROOT}; npm run test"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}