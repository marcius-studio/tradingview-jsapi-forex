// parse URL for getting symbol and interval params
// http://localhost:8080/?symbol=EURUSD&interval=10m

export default {
    created() {
        const params = this.getUrlParams(window.location.search)
        if (params.symbol && params.interval) {
            console.log('[parse URL] success', params)
            this.symbol = params.symbol
            this.interval = params.interval
        } else if (!params.symbol || !params.interval) {
            console.error('[parse URL] Error URL schema (http://<HOST>/?symbol=EUR/USD&interval=30)', params)
        }
    },
    methods: {
        getUrlParams(search) {
            let hashes = search.slice(search.indexOf('?') + 1).split('&')
            return hashes.reduce((params, hash) => {
                let [key, val] = hash.split('=')
                return Object.assign(params, { [key]: decodeURIComponent(val) })
            }, {})
        }
    }
}