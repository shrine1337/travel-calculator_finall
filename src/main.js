import * as CurrencyController from './currencies-js/controller.js'
import * as WayController from './way-js/controller.js'
import * as BudgetController from './budget-js/controller.js'

async function init() {
    await CurrencyController.refreshRates()
    CurrencyController.setupEventListeners()
    WayController.setupEventListeners()
    
    BudgetController.loadBudget()
    BudgetController.setupEventListeners()
}

init()
