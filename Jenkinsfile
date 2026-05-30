pipeline {
    agent any

    environment {
        // SonarCloud
        SONAR_TOKEN      = credentials('sonarcloud-token')
        SONAR_ORG        = 'jc2502'
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
                sh 'docker-compose down --remove-orphans || true'
                sh 'docker container prune -f || true'
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d'
                sh 'echo "Esperando a que backend esté listo..."'
                sh '''
                    for i in $(seq 1 30); do
                        curl -sf http://backend:5000/ > /dev/null && echo "Backend listo!" && exit 0
                        sleep 2
                    done
                    echo "ERROR: backend no respondio tras 60s" && exit 1
                '''
            }
        }

        stage('JMeter - Load Tests') {
            steps {
                sh '''
                    docker run --rm --network propgest_default \
                        --volumes-from jenkins \
                        justb4/jmeter:latest \
                        -n -t /var/jenkins_home/workspace/PropGest_master/tests/jmeter/PropGest_TestPlan.jmx \
                        -l /var/jenkins_home/workspace/PropGest_master/tests/jmeter/results.jtl \
                        -e -o /var/jenkins_home/workspace/PropGest_master/tests/jmeter/report \
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
                            --volumes-from jenkins \
                            sonarsource/sonar-scanner-cli:latest \
                            -Dsonar.projectKey="${SONAR_PROJECT_KEY}" \
                            -Dsonar.organization="${SONAR_ORG}" \
                            -Dsonar.host.url=https://sonarcloud.io \
                            -Dsonar.login="${SONAR_TOKEN}" \
                            -Dsonar.sources=/var/jenkins_home/workspace/PropGest_master/backend/src,/var/jenkins_home/workspace/PropGest_master/frontend/src \
                            -Dsonar.exclusions=**/node_modules/**,**/build/**
                    '''
                }
            }
        }

        stage('OWASP ZAP - Security Scan') {
            steps {
                sh 'docker rm -f zap || true'
                sh '''
                    docker run -d --rm --name zap \
                        --network propgest_default \
                        --volumes-from jenkins \
                        ghcr.io/zaproxy/zaproxy:stable \
                        zap.sh -daemon -port 8090 -config api.disablekey=true -host 0.0.0.0
                '''
                sh 'echo "Esperando a ZAP (45s)..." && sleep 45'
                sh '''
                    # Copiar config a /zap/wrk/ y ejecutar scan
                    ZAP_WRK=/var/jenkins_home/workspace/PropGest_master/tests/zap
                    docker exec zap mkdir -p /zap/wrk
                    docker exec zap cp $ZAP_WRK/zap.conf /zap/wrk/
                    docker exec zap zap-full-scan.py \
                        -t ${APP_URL} \
                        -c zap.conf \
                        -r zap-report.html \
                        -P 8090 \
                        -I
                    docker exec zap cp /zap/wrk/zap-report.html $ZAP_WRK/
                '''
                sh 'docker stop zap || true'
            }
            post {
                always {
                    sh 'docker stop zap || true'
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
