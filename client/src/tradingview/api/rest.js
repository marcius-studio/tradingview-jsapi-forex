// https://fcsapi.com/document/forex-api

import axios from 'axios'
import timestring from 'timestring'

import config from '../../../../config'

const url = 'https://fcsapi.com/api-v3/forex/' // 'https://fcsapi.com/api-v2/forex/'

let lastCandleTime = 0
/*
or to solve this issue, when you send second request
set From={any old time, from time doesn't matter}
set TO={first candle time from 1st request}
*/

export const intervals = {
    '1': '1m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1h',
    '120': '2h',
    '240': '4h',
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
// (symbol, interval, from, to)
export const getKlines = ({ symbol, interval, firstDataRequest }) => {

    const period = intervals[interval]

    // fixes: Data Provider response limited lenth of data "level=3" => 900 ticks
    // need request manually, otherwise will gaps
    if (firstDataRequest) lastCandleTime = 0

    const to = (lastCandleTime == 0) ? Math.round(Date.now() / 1000) : lastCandleTime
    const from = to - (timestring(period) * 900)

    console.log(to, from, Date.now())

    return request(`history`, { symbol, period, from, to, level: 3 })
        .then(res => {
            const data = res.data.response
            const klines = Object.values(data).map(i => formatingKline(i))
            lastCandleTime = klines.slice(0, 1)[0].time / 1000

            return klines || []
        })
}

export const getLastKline = (symbol, interval) => {
    const period = intervals[interval]

    // Without cache because will return old data for last candle
    return request(`history`, { symbol, period, level: 1 })
        .then(res => {
            const candle = res.data.response.slice(-1)[0]
            const kline = formatingKline(candle)
            return kline
        })
}

// helpers

export const checkInterval = (interval) => !!intervals[interval]

const formatingKline = (i) => {
    return {
        time: i.t * 1000,
        open: i.o,
        high: i.h,
        low: i.l,
        close: i.c,
        volume: i.v
    }
}

const request = (link, params) => {
    return axios({
        url: url + link,
        method: 'GET',
        params: {
            access_key: config.key,
            output: 'JSON',
            ...params
        }
    })
}