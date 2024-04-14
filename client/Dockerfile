# Use official Node.js image as base
FROM node:16-alpine

# Set working directory
WORKDIR /client

# Copy package.json and package-lock.json
COPY client/package.json client/package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the client application
COPY client/ .

# Expose port
EXPOSE 5173

# Start the client application
CMD ["npm", "run", "dev"]
