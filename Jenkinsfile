
def qualityGateValidation(qg) {
  if (qg.status != 'OK') {
    // emailext body: "WARNING SANTI: Code coverage is lower than 80% in Pipeline ${BUILD_NUMBER}", subject: 'Error Sonar Scan,   Quality Gate', to: "${EMAIL_ADDRESS}"
    return true
  }
  // emailext body: "CONGRATS SANTI: Code coverage is higher than 80%  in Pipeline ${BUILD_NUMBER} - SUCCESS", subject: 'Info - Correct Pipeline', to: "${EMAIL_ADDRESS}"
  return false
}

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
                      -Dsonar.webhooks.project=http://192.168.0.9:8080/sonarqube-webhook/  \
                      -Dsonar.sources=./${PROJECT_ROOT}/src \
                      -Dsonar.login=admin \
                      -Dsonar.password=admin \
                      -Dsonar.javascript.lcov.reportPaths=./${PROJECT_ROOT}/coverage/lcov.info"
                }
                timeout(time: 10, unit: 'MINUTES') {
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