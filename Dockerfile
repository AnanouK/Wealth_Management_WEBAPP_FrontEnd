FROM node as builder

# make the 'app' folder the current working directory
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npx jest
RUN npm run build

FROM nginx:alpine


# Copy from the stage 1
COPY --from=builder /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]