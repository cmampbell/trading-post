# API Used

Card Data: [Scryfall API][API]

[API]: https://scryfall.com/docs/api

## Steps to run app

1) Download card JSON file from scryfall API:  
[Cards JSON][Cards]

[Cards]: https://data.scryfall.io/default-cards/default-cards-20230709090727.json

2) Createdb "trading-post".
3) install dependencies /frontend + /backend
3) Adjust readAndSeed.js lin 76 to point to downloaded card data.
3) Run readAndSeed.js, should take 1 min
4) Run server.js in /backend
5) npm start in /frontend