# Builder Stage
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --force
ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ]; then npm run build:dev; else npm run build; fi

# Use an official Nginx image as the base image
FROM nginx
COPY --from=node /app/dist/techmemo-web /usr/share/nginx/html
EXPOSE 9080
CMD ["nginx", "-g", "daemon off;"]
