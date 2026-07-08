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

  }
    }
