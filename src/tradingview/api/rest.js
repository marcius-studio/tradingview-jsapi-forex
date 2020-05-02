// https://polygon.io/docs/#getting-started

import axios from 'axios'
const { setupCache } = require('axios-cache-adapter')

import config from '../../config'

const url = 'https://fcsapi.com/api-v2/forex/'

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 10 * 60 * 1000, // 10 min
    exclude: { query: false }
})

// Create `axios` instance passing the newly created `cache.adapter`
const axiosWithCache = axios.create({
    adapter: cache.adapter
})

export const intervals = {
    '1': '1m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1h',
    '300': '5h',
    '1D': '1d',
    '1W': '1w',
    'W': '1w',
    '1M': 'month'
}

// top_symbol: 1 - only popular pairs
export const getSymbols = () => {
    return request(`list`, { type: 'forex', top_symbol: 1 })
}

// [{ "id": 1, "name": "Euro US Dollar", "symbol": "EUR/USD", "decimal": 4 }]
export const getSymbol = (symbol) => {
    return request(`list`, { type: 'forex', top_symbol: 1 }).then(res => {
        const data = res.data.response

        const responseSymbol = data.find(i => i.symbol == symbol)
        const pair = symbol.split('/')

        return {
            symbol,
            name: responseSymbol.name,
            baseAssetName: pair[0],
            quoteAssetName: pair[1],
            pricescale: parseFloat('1' + Array(parseFloat(responseSymbol.decimal)).fill(0).join(''))
        }

    })
}

export const getKlines = (symbol, interval, from, to) => {

    const period = intervals[interval]

    return request(`history`, { symbol, period })
        .then(res => {
            const data = res.data.response
            const klines = data.map(i => formatingKline(i))
            //return klines.map(i => ({ ...i, time: i.time * 1000 })) // need for TO , FROM params
            return klines
        })
}

export const getLastKline = (symbol, period) => {
    // Without cache because will return old data for last candle
    return axios.get(url + `candle`, { params: { symbol, period, access_key: config.key, output: 'JSON', } })
        .then(res => {
            const data = res.data.response[0]
            const klines = formatingKline(data)
            return klines
        })
}

export const checkInterval = (interval) => !!intervals[interval]

const formatingKline = (i) => {
    return {
        time: i.t,
        open: i.o,
        high: i.h,
        low: i.l,
        close: i.c,
        // volume: i.v
    }
}

const request = (link, params) => {
    return axiosWithCache({
        url: url + link,
        method: 'GET',
        params: {
            access_key: config.key,
            output: 'JSON',
            ...params
        }
    })
}