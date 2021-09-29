## ES cosmos migration script

To migrate ES cosmo records from old DB to new DB.

## Dependency Installation

$ yarn

or

$ npm install

## Run script

$ yarn start

or

$ npm start

## Description

Before running script you have to make sure few things.

- You have to update the ENV config with what you are going to do.
- There is two options(ENVIRONMENT, MODE) to run the script in ENV.
- ENVIRONMENT - uat/prod.
- MODE - migrate/download. Migrate will push records to targetted DB. Download will download record from specified DB.
- You have to create folder in your root. ex. app/records/{environment}/{collectionName}
