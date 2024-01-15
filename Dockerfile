# Use an official Node runtime as a base image
FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node image for the production environment
FROM node:14-alpine

# Set the working directory in the new image
WORKDIR /app

# Copy the built application from the builder image
COPY --from=builder /app/dist /app

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
