# TradingView JS API Forex

Ready-made solution TradingView Charting Library with Forex provider [Fcsapi.com](https://fcsapi.com/). 

Repository features:

* TradingView Charting Library
* Updating data every minute (can be changed)
* [Low-level save/load](https://github.com/tradingview/charting_library/wiki/Widget-Methods#savecallback) API with backend

## Installation

Required [Node.js LTS](https://nodejs.org/en/)

### config.js

Data provider need **YOUR_KEY**, add in [config.js](/config.js)

```javascript
{
    key: 'YOUR_KEY'
}
```

### Commands

```node
$ cd client && yarn
$ cd server && yarn
```

### Run

```node
$ cd client && yarn run serve
$ cd server && yarn run start
```

### Build

```node
$ cd client && yarn run build
$ cd server && yarn run build
```
Build folder [dist](/dist). 

**Note, need to put charting_library in the [public](client/public) folder**

### PHP ONLY

Can be CORS error, to solve add in `.htaccess` this lines:

```
Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type"
Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
```

## Stay in touch

Feel free to ask questions 😊

* Discord: Nikita Marcius#2274
* Telegram: [@nikitamarcius](https://ttttt.me/nikitamarcius)

## Contributors

<a href="https://github.com/marcius-studio">
<img src="https://raw.githubusercontent.com/marcius-studio/storage/master/badge-marcius-studio.svg" height="60">
</a>

## Licence

[Apache License Version 2.0](LICENSE.md)
