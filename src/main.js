import * as CurrencyController from './mvc/controller.js'


async function init() {
    await CurrencyController.refreshRates()
    CurrencyController.setupEventListeners()
}

init()
