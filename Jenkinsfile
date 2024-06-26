pipeline {
    agent any

    stages{

        stage('Build') {
            steps {
                script {
                    // Obter o ID do build
                    def buildId = env.BUILD_ID
                    
                    // Enviar o ID do build para a aplicação Node.js
                    sh "curl -X POST http://localhost:80/build-id -d 'buildId=${buildId}'"
                }
            }
        }

        
        stage('Build Image') {
            steps {
                script {
                    dockerapp = docker.build("viniciuscaol/portfolio:v${env.BUILD_ID}", '-f ./Dockerfile .')
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerapp.push('latest')
                        dockerapp.push("v${env.BUILD_ID}")
                    }
                }
            }
        }

        stage('Deploy') {
            environment {
                tag_version = "${env.BUILD_ID}"
            }
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']){
                    sh 'sed -i "s/{{TAG}}/$tag_version/g" ./k8s/deployment.yaml'
                    sh 'kubectl apply -f ./k8s/ -R'
                }
            }
        }
    }
}