import * as Model from './model.js'
import * as View from './view.js'
import { getCurrencyRates } from '../currencies-js/model.js'

function validateInput(inputElement) {
    const cleanValue = inputElement.value.replace(',', '.').trim()
    const num = parseFloat(cleanValue)
    if (cleanValue === '' || isNaN(num) || num < 0) {
        inputElement.classList.add('invalid')
        return { isValid: false, value: 0 }
    }
    inputElement.classList.remove('invalid')
    return { isValid: true, value: num }
}

export function addExpense() {
    const amountInput = document.getElementById('expense-amount')
    const validation = validateInput(amountInput)
    if (!validation.isValid) return

    const category = document.getElementById('expense-category').value
    const currency = document.getElementById('expense-currency').value

    Model.addExpenseItem(category, validation.value, currency)
    amountInput.value = ''
    recalculateBudget()
}

export function loadBudget() {
    Model.loadBudgetFromStorage()
    recalculateBudget()
}

export function recalculateBudget() {
    const expenses = Model.getBudgetExpenses()
    const rates = getCurrencyRates() // Связываем с живыми курсами из модуля валют
    View.renderBudget(expenses, rates)
}

export function setupEventListeners() {
    document.getElementById('btn-add-expense')?.addEventListener('click', addExpense)

    document.getElementById('budget-tbody')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const id = parseInt(e.target.getAttribute('data-id'))
            Model.deleteExpenseItem(id)
            recalculateBudget()
        }
    })
}
