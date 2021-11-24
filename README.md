# pronoia-coach-api

## Requirements

### DB

### Firebase Account

### Etc

## Let's get our hands dirty

### App Packages

First you need to install/update the packages. To do so, run:

```bash
npm install
```

### App Settings

Now you need to duplicate the file called `.env.example` and name it `.env`. This file contains all the variables and settings required to run your app. Now you need to go over the variables there and change them to the ones that represent your local environment. 

### Start the App

To start the app just run:

```bash
npm run dev
```

## Addming Models

### Add model to models fodler

Follow TypeOrm decoartos

### Create migration

Run the following command, where `<<Model>>` is the name of the models you have changed or created.

```bash
    npm run typeorm migration:generate -- -n <<Model>>
```

### Run Migrations

To run migrations excecute

```bash
    npm run migrations
```

## Troubelshooting

### Backend: Error (auth/configuration-not-found)

This means you haven't enable authentication in your firebase account.
## Notes

When we want to start adding functioanlity lets visit 
https://github.com/hagopj13/node-express-boilerplate
first

## TODO
Local Environment:
Local Mongo
use dontenv for env variables describing all config values

 1026  //start here
 1027  npm run build
 1028  cp package.json ./dist/
 1029  cp ormconfig.js ./dist/
 1030  cp .env ./dist/
 1031  cd dist/
 1032  npm install --only production
 1033  npm raun start:prod
 1034  npm run migrations
 1035  npm run start:p


 autocannon https://pronoia.rour.dev/util -H authorization="Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWUyOTRlZWRjMTY3Y2Q5N2JiNWE4MTliYmY3OTA2MzZmMTIzN2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoianVuYSBwYWJsbyB1cnp1cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wcm9ub2lhLXdlYi1hcHAiLCJhdWQiOiJwcm9ub2lhLXdlYi1hcHAiLCJhdXRoX3RpbWUiOjE2MzcxODY0MzEsInVzZXJfaWQiOiI5MmVhVWxPbGhxU1JtSjVTNTYwemxhOXBwTGgyIiwic3ViIjoiOTJlYVVsT2xocVNSbUo1UzU2MHpsYTlwcExoMiIsImlhdCI6MTYzNzE4NjQzMSwiZXhwIjoxNjM3MTkwMDMxLCJlbWFpbCI6ImpwQHJvdXIuZGV2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpwQHJvdXIuZGV2Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Hek4BImeWJ_bNAkfmeK-Vvb9-2r9QYbYFyhkwbLVyLmXapof9dm_Y7byvu_N6wn7kd6bzTnXTdX_XiKy7D60ts_TjPjmOqyOtbIP9iR1KnvCEQ_fhFATO4iYiPh4SQg1BLRLqOALzlkXYMP7fhX8AxZivwcR_TC3NYQO2hbhW7MYZvma7xrUa9xw8-Y119OtXvi3AeOOI_zkV8M5lXYebxfPb-qwcCGuFt4jEVN3Cj9Yfq09vOEvUy4QyoSb9p5Cb4x7kl2lBpxwqsZi8Eif7NBpZbQyv-eljrA7tkJePddCdTQICk-YsiYYm8wDPPJTJOhA0wZ--gMwiFiwJsx9Mg" -d 60 -c 2