# FROM node:8

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# EXPOSE 8080

# CMD [ "npm", "start" ]
FROM node:10

WORKDIR /app

COPY package.json package.json

RUN npm install
RUN npm install -S react
RUN npm install -S react-dom
RUN npm install -g webpack-cli
RUN npm install -D webpack
RUN npm install -g webpack
RUN npm install -D babel-core
RUN npm install -D babel-loader
RUN npm install -D babel-preset-react
RUN npm install -D babel-preset-es2015

COPY . . 

EXPOSE 3000

RUN npm install -g nodemon 

CMD [ "nodemon", "index.js" ] 
