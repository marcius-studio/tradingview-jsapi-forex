# TradingView JS API Forex

Sample implementation of TradingView Charting Library JS API for Forex.

Datafeed provider [Fcsapi.com](https://fcsapi.com/)

## Build

Build folder [dist](/dist). 
**Note, need to put charting_library in the directory**

## Init

Need [Node.js LTS](https://nodejs.org/en/)

```node
$ npm i
$ yarn 
```

### config.js

Data provider need **YOUR_KEY**, add in [config.js](/src/config.js)

```javascript
{
    key: 'YOUR_KEY'
}
```

### Commands

```node
$ npm run serve // development
$ npm run build
```


