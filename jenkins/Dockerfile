FROM jenkins/jenkins:lts-jdk17

USER root

# Install required packages
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    git \
    curl \
    unzip \
    wget \
    ca-certificates \
    gnupg \
    lsb-release && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Trivy from the official repository
RUN wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | \
    gpg --dearmor -o /usr/share/keyrings/trivy.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | \
    tee /etc/apt/sources.list.d/trivy.list && \
    apt-get update && \
    apt-get install -y trivy

# Download Trivy HTML template
RUN mkdir -p /usr/local/share/trivy/templates && \
    wget -O /usr/local/share/trivy/templates/html.tpl \
    https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl

# Match Docker group GID with host
RUN groupmod -g 109 docker && \
    usermod -aG docker jenkins

USER jenkins

EXPOSE 8080
EXPOSE 50000
