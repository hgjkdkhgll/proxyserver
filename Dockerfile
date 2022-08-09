FROM  node:18.6.0
WORKDIR D:\newdock
COPY   package*.json  ./
RUN npm install 
COPY  .  .

RUN curl www.google.com
USER node
EXPOSE 9000
CMD ["npm", "start"]
