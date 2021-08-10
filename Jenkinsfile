pipeline {
    agent any
    tools {
      nodejs 'nodejs'
  }
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
        stage('Generate coverage report') {
            steps {
              // Run code-coverage reports
              sh "cd ${PROJECT_ROOT}; npm test -- --coverage --watchAll=false"
            }
        }
        stage('scan') {
            environment {
            // Previously defined in the Jenkins "Global Tool Configuration"
            scannerHome = tool 'sonar-scanner'
            }
            steps {
                // "sonarqube" is the server configured in "Configure System"
                withSonarQubeEnv('sonarqube') {
                    // Execute the SonarQube scanner with desired flags
                    sh "${scannerHome}/bin/sonar-scanner \
                      -Dsonar.projectKey=SimpleExpressExample:Test \
                      -Dsonar.projectName=SimpleExpressExample \
                      -Dsonar.projectVersion=0.0.${BUILD_NUMBER} \
                      -Dsonar.host.url=http://192.168.0.9:9000 \
                      -Dsonar.sources=./${PROJECT_ROOT}/app.js,./${PROJECT_ROOT}/config/db.config.js,./${PROJECT_ROOT}/routes/developers.js \
                      -Dsonar.login=admin \
                      -Dsonar.password=admin \
                      -Dsonar.tests=./${PROJECT_ROOT}/test \
                      -Dsonar.javascript.lcov.reportPaths=./${PROJECT_ROOT}/coverage/lcov.info"
                }
                timeout(time: 3, unit: 'MINUTES') {
                  // In case of SonarQube failure or direct timeout exceed, stop Pipeline
                  waitForQualityGate abortPipeline: qualityGateValidation(waitForQualityGate())
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}