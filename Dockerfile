#stage 1
FROM node:16.19.0-alpine as node
WORKDIR /usr/src/app
COPY . ./
ARG PE_JFROG_URL
ARG PE_JFROG_VIRTUAL_REPO
ARG PE_JFROG_NPM_AUTH
RUN npm install --legacy-peer-deps
RUN pwd && ls -al
RUN npm run build
RUN rm -f .npmrc

#stage 2
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=node usr/src/app/default.conf /etc/nginx/conf.d/
COPY --from=node usr/src/app/dist/gor-app /usr/share/nginx/html