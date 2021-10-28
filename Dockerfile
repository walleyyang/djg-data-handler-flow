FROM node:16

# tzdata for timzone
RUN apt-get update -y
RUN apt-get install -y tzdata
 
# timezone env with default
ENV TZ America/New_York

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]