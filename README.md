# TradingView JS API Forex

Sample implementation of TradingView Charting Library JS API for Forex.

Datafeed provider [Fcsapi.com](https://fcsapi.com/)

## Init

Need [Node.js LTS](https://nodejs.org/en/)

```node
$ npm i
$ yarn 
```

### config.js

Data provider need **YOUR_KEY**, add in [config.js](/config.js)

```javascript
{
    key: 'YOUR_KEY'
}
```

### Commands

```node
$ npm run serve // development http://localhost:8080
$ npm run build // build
```
Build folder [dist](/dist). 

**Note, need to put charting_library in the directory**

### PHP ONLY

Can be CORS error, to solve add in `.htaccess` this lines:

```
Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type"
Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
```

