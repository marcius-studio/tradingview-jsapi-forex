import Vue from 'vue'
import App from './tradingview'

new Vue({
    el: '#app',
    mounted() { // https://github.com/nikitamarcius
        console.log('%c Developed by Nikita Marcius', 'background: #5490f1; color: white; display: block;', 'https://github.com/nikitamarcius')
    },
    render: h => h(App)
})