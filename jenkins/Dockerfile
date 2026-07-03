FROM jenkins/jenkins:lts-jdk17

USER root

# Install required tools
RUN apt-get update && \
    apt-get install -y docker.io git curl unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Change docker group GID to match the host (109)
RUN groupmod -g 109 docker && \
    usermod -aG docker jenkins

USER jenkins

EXPOSE 8080
EXPOSE 50000

