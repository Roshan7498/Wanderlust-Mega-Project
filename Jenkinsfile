pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Workspace Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Checkout') {
            steps {
                sh '''
                    pwd
                    ls -la
                '''
            }
        }

        stage('Backend - Install Dependencies') {
            steps {
                dir('backend') {
                    sh '''
                        echo "===== Backend ====="
                        node --version
                        npm --version
                        npm install
                    '''
                }
            }
        }

        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {
                    sh '''
                        echo "===== Frontend ====="
                        node --version
                        npm --version
                        npm install
                    '''
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    sh '''
                        echo "===== Building Frontend ====="
                        npm run build
                    '''
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'frontend/dist/**', fingerprint: true
                }
            }
        }

        stage('SonarQube Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${tool 'SonarQubeScanner'}/bin/sonar-scanner \
                        -Dsonar.projectKey=wanderlust \
                        -Dsonar.projectName=wanderlust \
                        -Dsonar.sources=. \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.javascript.node.maxspace=8192 \
                        -Dsonar.token=$SONAR_AUTH_TOKEN
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_API_KEY')]) {
                    dependencyCheck(
                        odcInstallation: 'DependencyCheck-OWASP',
                        additionalArguments: "--scan . --format XML --format HTML --nvdApiKey ${NVD_API_KEY}"
                    )
                }
            }

            post {
                always {
                    dependencyCheckPublisher pattern: '**/dependency-check-report.xml'

                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'dependency-check-report.html',
                        reportName: 'OWASP Dependency Check Report'
                    ])
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                    echo "===== Building Backend Docker Image ====="

                    docker build \
                      -t roshan1611/wanderlust-backend:${BUILD_NUMBER} \
                      -t roshan1611/wanderlust-backend:latest \
                      ./backend
                '''
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                    echo "===== Building Frontend Docker Image ====="

                    docker build \
                      -t roshan1611/wanderlust-frontend:${BUILD_NUMBER} \
                      -t roshan1611/wanderlust-frontend:latest \
                      ./frontend
                '''
            }
        }
stage('Docker Hub Login') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD'
        )]) {
            sh '''
                echo "===== Logging into Docker Hub ====="
                echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            '''
        }
    }
}

stage('Push Backend Docker Image') {
    steps {
        sh '''
            echo "===== Pushing Backend Docker Image ====="

            docker push roshan1611/wanderlust-backend:${BUILD_NUMBER}
            docker push roshan1611/wanderlust-backend:latest
        '''
    }
}

stage('Push Frontend Docker Image') {
    steps {
        sh '''
            echo "===== Pushing Frontend Docker Image ====="

            docker push roshan1611/wanderlust-frontend:${BUILD_NUMBER}
            docker push roshan1611/wanderlust-frontend:latest
        '''
    }
}

    }
}
