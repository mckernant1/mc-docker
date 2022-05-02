FROM 653528873951.dkr.ecr.us-west-2.amazonaws.com/alpine

RUN apk add openjdk15-jre nodejs jq

COPY . .

RUN npm i

RUN npm run main

RUN ./run-cf.sh
