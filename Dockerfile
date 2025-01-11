# Stage 1: Serve the production build using Nginx
FROM nginx:alpine

# Copy the pre-built React app into Nginx's web directory
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]