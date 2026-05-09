pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/kinley05/KinleyTshering_02240348_DSO101_A1.git'
            }
        }

        stage('Install') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    junit 'backend/junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'App is deployed on Render.com via GitHub auto-deploy'
                echo 'Backend: https://be-todo-eytb.onrender.com'
                echo 'Frontend: https://fe-todo-kinley.onrender.com'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}