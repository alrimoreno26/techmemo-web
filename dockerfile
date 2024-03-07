# Builder Stage
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --production

# Use an official Nginx image as the base image
FROM nginx
COPY --from=node /app/dist/techzilla-web /usr/share/nginx/html
EXPOSE 9080
CMD ["nginx", "-g", "daemon off;"]
