// GET, PUT request to backend for low-level save/load API.
// https://github.com/tradingview/charting_library/wiki/Saving-and-Loading-Charts
// https://github.com/tradingview/charting_library/wiki/Chart-Methods#createstudytemplateoptions

import axios from 'axios'

export default {
    watch: {
        onChartReady() {
            // Load study
            this.getOverlay().then(template => {
                if (template && Object.keys(template).length > 0) {
                    console.log('[Study] load success', template)
                    this.widget.activeChart().applyStudyTemplate(template)
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
                            const template = this.widget.activeChart().createStudyTemplate({ saveInterval: true })
                            this.setOverlay(template).then(() => console.log('[Study] save success', template))
                        },
                    }))
                    button.innerHTML = `Save ${this.symbol}`
                })
            }
        }
    },
    methods: {
        getOverlay() {
            return this.request({ method: 'get', params: { symbol: this.symbol } })
        },
        setOverlay(content) {
            return this.request({ method: 'put', params: { symbol: this.symbol, content } })
        },
        request({ method = 'get', params }) {
            // option help to test endpoint request
            if (process.env.NODE_ENV == 'development') params.user = 'test'

            return axios({
                url: 'https://fxpricezone.com/charts-storage/', // endpoint
                method,
                params,
            })
                .then(res => res)
                .catch(error => console.error(error))
        }
    }
}