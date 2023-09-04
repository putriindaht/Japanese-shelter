FROM node:18.15.0

ENV NODE_ENV=production
ENV PORT=4002

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "start"]