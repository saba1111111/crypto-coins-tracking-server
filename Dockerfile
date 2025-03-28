# Use official Nest base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build app
# RUN npm run build

# Run app
CMD ["npm", "run", "start:dev"]
