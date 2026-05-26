import * as Controller from './currencies-js/controller.js'

async function init() {
    await Controller.refreshRates()
    Controller.setupEventListeners()
}

init()
