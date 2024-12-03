FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && npm install vite --save-dev && npm install typescript --save-dev && npm install -g serve
COPY . .
ENV VITE_BE_URI=${VITE_BE_URI}
RUN npm run build
CMD ["serve", "-s", "dist"]