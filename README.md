# TradingView JS API Forex

Ready-made solution TradingView Charting Library with Forex provider [Fcsapi.com](https://fcsapi.com/). 

Repository features:

* TradingView Charting Library
* Updating data every minute (can be changed)
* [Low-level save/load](https://github.com/tradingview/charting_library/wiki/Saving-and-Loading-Charts) API with backend

## Articles

* **[Connecting and settings TradingView with JS API and UDF adapter - Medium.com](https://medium.com/marcius-studio/connecting-and-settings-tradingview-with-js-api-and-udf-adapter-b790297a31fa)**
* **[Financial charts for your application - Medium.com](https://medium.com/marcius-studio/financial-charts-for-your-application-cfcceb147786)**

## Before begin

The Charting Library is free, but its code is in the private repository on GitHub.
Make sure that you have access to this repository: <https://github.com/tradingview/charting_library/>.

If you see 404 error page, then you need to request access to this repository at <https://tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?feature=technical-analysis-charts> and click on the `Get Library` button.

## Features

**Client-side**

* [x] Vuejs 2.x
* [x] @vue/cli-service (Webpack 4, SASS/SCSS)

**Server-side**

* [x] Fastifyjs
* [x] NeDB

## Installation 

Install dependences for client and server side.

```bash
$ cd client && npm install
$ cd server && npm install
```

Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/public` folder. The earliest supported version of the Charting Library is 1.15. If you get 404 then you need to [request an access to this repository](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

**[/config.js](/config.js)**

Data provider need `<API_KEY>`

```js
{
    key: 'YOUR_KEY'
}
```

## Commands

```bash
// client\package.json
$ cd client && npm run serve // run
$ cd client && npm run build

// server\package.json
$ cd server && npm run start // run
$ cd server && npm run build
```

## PHP only

Can be CORS error, to solve add in `.htaccess` this lines:

```
Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Headers "origin, x-requested-with, content-type"
Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
```

## Contributors

<a href="https://github.com/marcius-studio">
<img src="https://raw.githubusercontent.com/marcius-studio/storage/master/badge-marcius-studio.svg" height="60">
</a>
