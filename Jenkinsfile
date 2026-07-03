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
    }
}

