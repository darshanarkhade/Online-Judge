FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

RUN apk update && apk add --no-cache g++ \
    python3 \
    python3-dev \
    py3-pip \
    openjdk11-jdk
    
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application 
COPY . .

# Expose the desired port (if needed)
EXPOSE 8080

# Command to run the application
CMD ["node", "index.js"]
