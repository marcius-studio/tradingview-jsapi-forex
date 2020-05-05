const TradingView = require('../../public/charting_library/charting_library.min')

import datafeed from './api'

// mixins
import params from './mixins/params'
import overlay from './mixins/overlay'

export default {
    mixins: [params, overlay],
    template: '<div id="tv_chart_container"></div>',
    data: () => ({
        widget: null,
        onChartReady: false,

        symbol: 'EUR/USD',
        interval: '30'
    }),
    mounted() {
        const options = {
            debug: false, // uncomment this line to see Library errors and warnings in the console
            fullscreen: true,
            symbol: this.symbol,
            interval: this.interval,
            container_id: "tv_chart_container",
            datafeed,
            library_path: "/charting_library/",
            locale: "en",
            disabled_features: ["study_templates", 'header_saveload'],
            enabled_features: [],
            charts_storage_url: 'http://saveload.tradingview.com',
            charts_storage_api_version: "1.1",
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }

        this.widget = new TradingView.widget(options) // Create TV chart

        this.widget.onChartReady(() => {
            this.onChartReady = true
            this.$emit('onReady', true)
        });
    }
}