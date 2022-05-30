FROM 653528873951.dkr.ecr.us-west-2.amazonaws.com/alpine

RUN apk add openjdk17-jre npm unzip

COPY . .

RUN npm i

ENTRYPOINT ./start.sh
