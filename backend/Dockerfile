# Use official Node.js image
FROM node:21

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Copy your environment file
COPY .env .env

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

