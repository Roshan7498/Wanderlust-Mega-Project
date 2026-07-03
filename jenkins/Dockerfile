# Base Jenkins image with Java 17
FROM jenkins/jenkins:lts-jdk17

# Switch to root user to install packages
USER root

# Install Docker CLI, Git and Curl
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    git \
    curl \
    unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Allow Jenkins user to use Docker
RUN usermod -aG docker jenkins

# Switch back to Jenkins user
USER jenkins

# Jenkins Web UI
EXPOSE 8080

# Jenkins Agent Port
EXPOSE 50000
