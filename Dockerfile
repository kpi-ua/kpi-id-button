# Use a lightweight base image with Node.js and Nginx
FROM node:20-slim AS build

# Set the working directory
WORKDIR /app

# Copy project files and install dependencies
COPY button button
COPY demo demo

# Build the "button" project (assuming it has a build step that produces dist)
# Adjust the build command if your button project uses a different build process
RUN cd button && npm install && npm run build

# Build the "demo" project (React app)
RUN cd demo && npm install && npm run build

# --- Production Stage ---
FROM nginx:stable-alpine

# Copy the built "button" file
# Adjust the path if your button build output is different
COPY --from=build /app/button/dist/kpi-id-signin.js /usr/share/nginx/html/kpi-id-signin.js

# Copy the built "demo" React app
COPY --from=build /app/demo/dist /usr/share/nginx/html/demo

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
