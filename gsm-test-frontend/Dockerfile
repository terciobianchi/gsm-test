# Dockerfile
 
# Use an existing node alpine image as a base image.
FROM node:22-alpine
 
# Set the working directory.
WORKDIR /app
 
# Copy the package.json file.
COPY package.json .
 
# Install application dependencies.
RUN yarn
 
# Copy the rest of the application files.
COPY . .
 
# Expose the port.
EXPOSE 3001
 
# Run the application.
CMD ["yarn", "start"]