pipeline {
    agent any

    environment {
        // SonarCloud
        SONAR_TOKEN      = credentials('sonarcloud-token')
        SONAR_ORG        = 'Jorge Claros'
        SONAR_PROJECT_KEY = 'PropGest'

        // OWASP ZAP
        ZAP_API_KEY      = 'changeme'
        ZAP_PORT         = '8090'

        // Docker network
        APP_URL          = 'http://backend:5000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Start') {
            steps {
                sh 'docker-compose up -d --build'
                sh 'echo "Esperando a que backend esté listo..."'
                sh '''
                    for i in $(seq 1 30); do
                        curl -s http://localhost:5000/ > /dev/null && break
                        sleep 2
                    done
                '''
            }
        }

        stage('JMeter - Load Tests') {
            steps {
                sh '''
                    docker run --rm --network propgest_default \
                        -v "$PWD/tests/jmeter:/tests" \
                        justb4/jmeter:latest \
                        -n -t /tests/PropGest_TestPlan.jmx \
                        -l /tests/results.jtl \
                        -e -o /tests/report \
                        -Jhost=backend -Jport=5000
                '''
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        reportDir: 'tests/jmeter/report',
                        reportName: 'JMeter Report',
                        reportFiles: 'index.html'
                    ])
                }
            }
        }

        stage('SonarQube Cloud - Code Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    sh '''
                        docker run --rm \
                            -v "$PWD:/usr/src" \
                            sonarsource/sonar-scanner-cli:latest \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            -Dsonar.organization=${SONAR_ORG} \
                            -Dsonar.host.url=https://sonarcloud.io \
                            -Dsonar.login=${SONAR_TOKEN} \
                            -Dsonar.sources=backend/src,frontend/src \
                            -Dsonar.exclusions=**/node_modules/**,**/build/**
                    '''
                }
            }
        }

        stage('OWASP ZAP - Security Scan') {
            steps {
                sh '''
                    docker run -d --rm --name zap \
                        --network propgest_default \
                        -p ${ZAP_PORT}:8090 \
                        -v "$PWD/tests/zap:/zap/wrk" \
                        -e ZAP_API_KEY=${ZAP_API_KEY} \
                        ghcr.io/zaproxy/zaproxy:stable \
                        zap.sh -daemon -port 8090 -config api.key=${ZAP_API_KEY}
                '''
                sh 'echo "Esperando a ZAP..." && sleep 15'
                sh '''
                    docker exec zap zap-full-scan.py \
                        -t ${APP_URL} \
                        -c /zap/wrk/zap.conf \
                        -r /zap/wrk/zap-report.html \
                        -z "-config api.key=${ZAP_API_KEY}"
                '''
                sh 'docker stop zap || true'
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        reportDir: 'tests/zap',
                        reportName: 'OWASP ZAP Report',
                        reportFiles: 'zap-report.html'
                    ])
                }
            }
        }
    }

    post {
        always {
            sh 'docker-compose down'
            cleanWs()
        }
    }
}
