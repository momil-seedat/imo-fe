# Stage 1: Build the React app
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Install dependencies first (cached)
COPY package*.json ./

# Install dependencies, including react-scripts
RUN npm install

# Copy source code into the container
COPY . .

# Ensure react-scripts is included and build the app
RUN npm install react-scripts@latest -g
RUN npm run build

# Stage 2: Serve the production build using Nginx
FROM nginx:alpine

# Copy the build output from the first stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
