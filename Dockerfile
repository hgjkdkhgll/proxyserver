FROM  node:18.6.0
WORKDIR /noce/proxyserver
COPY   package*.json  ./
RUN npm install 
COPY  .  .
RUN apk add curl
RUN curl www.google.com
USER node
CMD ["npm", "start"]
