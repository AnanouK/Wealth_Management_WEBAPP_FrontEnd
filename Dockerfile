FROM node:14 as builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app
RUN npm run build

FROM nginx:alpine

## Remove default nginx index pagec
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --from=builder /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]