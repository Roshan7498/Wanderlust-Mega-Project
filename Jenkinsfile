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
                git branch: 'RoshansDevOps',
                    url: 'https://github.com/Roshan7498/Wanderlust-Mega-Project.git'
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

