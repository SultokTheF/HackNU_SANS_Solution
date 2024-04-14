# Use official Node.js image as base
FROM node:16-alpine

# Set working directory
WORKDIR /speaking

# Copy package.json and package-lock.json
COPY speaking/package.json speaking/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the speaking application
COPY speaking/ .

# Expose port
EXPOSE 5001

# Start the speaking application
CMD ["node", "index.js"]
