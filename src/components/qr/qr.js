import Vue from 'vue'
import qr from './qr.vue'

const QrConstructor = Vue.extend(qr)

function showQr() {
    const qrDOM = new QrConstructor({
        el: document.createElement('div'),
        data() {
            return {
                isShow: true
            }
        }

    })
    document.body.appendChild(qrDOM.$el)
}

export default function() {
    Vue.prototype.showQr = showQr
}