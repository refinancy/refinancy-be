FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]

