# Stage 1: Build the React app
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies, including react-scripts (using npm ci for faster installs)
RUN npm ci

# Copy the rest of the source code into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the production build using Nginx
FROM nginx:alpine

# Copy the build output from the first stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]
