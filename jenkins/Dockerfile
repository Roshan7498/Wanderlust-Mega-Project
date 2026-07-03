FROM jenkins/jenkins:lts-jdk21

USER root

RUN apt-get update && \
    apt-get install -y \
        git \
        curl \
        unzip \
        docker.io && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN usermod -aG docker jenkins

USER jenkins

EXPOSE 8080
EXPOSE 50000
