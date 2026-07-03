pipeline {

    agent any

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
                    echo "Current Directory:"
                    pwd

                    echo ""

                    echo "Repository Contents:"
                    ls -la
                '''
            }
        }

    }
}

