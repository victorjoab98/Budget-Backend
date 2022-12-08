FROM node:18-alpine3.15

ENV PORT=4000 \
    DB_PORT=5432 \ 
    DB_HOST=localhost \
    DB_USER=root \
    DB_PASSWORD=root \
    DB_DIALECT=postgres \
    DB_NAME=budget-db \
    JWT_SECRET=safd4rsf4ffsd234088vp 

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]
CMD ["npm", "run", "migrations:run"]
CMD ["npm", "run", "seeders:run"]