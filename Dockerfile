# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Build the app for production
RUN npm run build

# Start the Next.js app
CMD ["npm", "run", "dev"]
