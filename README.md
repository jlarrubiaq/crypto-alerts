# Crypto Price Alert Serverless App

Simple serverless app that allows setting Cryto price alerts. 

The app make use of the Coinbase Market Price API to regularly pull currency prices and create alerts.

## How to use

Set your alerts in `config/alerts.json` (there is an existing example).
Set the pull interval in `serverless.yml` (default to 1 minute).
Create a .env file to with your SMTP and email config.

Run `npm install` / `npm start` to start pulling prices and receiving alerts.

