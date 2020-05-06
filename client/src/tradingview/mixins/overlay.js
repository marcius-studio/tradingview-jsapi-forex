// GET, PUT request to backend for low-level save/load API.
// https://github.com/tradingview/charting_library/wiki/Saving-and-Loading-Charts
// https://github.com/tradingview/charting_library/wiki/Chart-Methods#createstudytemplateoptions

import axios from 'axios'

export default {
    watch: {
        onChartReady() {
            // Load study
            this.getOverlay().then(res => {
                if (res && typeof res.data == 'object') {
                    if (res.data.layout == 's') {
                        this.widget.load(res.data)
                        console.log('[chart`s overlay] loaded', res)
                    }
                }
            })


            if (this.admin) {
                // Save study
                this.widget.headerReady().then(() => {
                    const button = this.widget.createButton()
                    button.setAttribute('title', 'Click save chart`s overlay');
                    button.classList.add('apply-common-tooltip');
                    button.addEventListener('click', () => this.widget.showNoticeDialog({
                        title: 'Save chart',
                        body: 'TradingView template was saved successfuly',
                        callback: () => {
                            // eslint-disable-next-line no-console
                            this.widget.save(cb => this.setOverlay(cb))
                        },
                    }))
                    button.innerHTML = 'Save chart'
                })
            }

        }
    },
    methods: {
        getOverlay() {
            return this.request({ method: 'get' })
        },
        setOverlay(content) {
            return this.request({ method: 'post', data: content })
        },
        request({ method = 'get', data }) {
            let params = {}

            // endpoint
            const url = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/charts-storage/' : 'https://fxpricezone.com/charts-storage/'
            // const url = 'https://fxpricezone.com/charts-storage/'

            // option help to test endpoint request
            if (process.env.NODE_ENV == 'development') params.user = 'test'

            const symbol = this.widget.symbolInterval().symbol
            params.symbol = symbol

            return axios({
                url,
                method,
                params,
                data
            })
                .then(res => res)
                .catch(error => console.error(error))
        }
    }
}