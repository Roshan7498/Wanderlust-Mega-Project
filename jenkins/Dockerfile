FROM jenkins/jenkins:lts-jdk17

USER root

# Install required tools
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    git \
    curl \
    unzip \
    ca-certificates \
    gnupg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 18.x
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Trivy (official script)
RUN curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh

# Match Docker group GID with host
RUN groupmod -g 109 docker && \
    usermod -aG docker jenkins

USER jenkins

EXPOSE 8080
EXPOSE 50000
