import * as Model from './model.js'
import * as View from './view.js'

export async function refreshRates() {
    const data = await Model.loadRates()
    View.updateTime(data.Date, data.Timestamp)
    recalculateBudget()
}

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

export function convertCurrency() {
    const sumInput = document.querySelector('#calc-amount')
    const validation = validateInput(sumInput)

    if (!validation.isValid) {
        View.showResultCurrencie('Введите сумму')
        return
    }

    const fromCode = document.getElementById('from-currency').value
    const toCode = document.getElementById('to-currency').value
    
    const currencyRates = Model.getCurrencyRates()
    const fromRate = currencyRates[fromCode]
    const toRate = currencyRates[toCode]
    const result = validation.value * (fromRate / toRate)

    View.showResultCurrencie(`${validation.value.toLocaleString('ru-RU')} ${fromCode} = ${result.toFixed(2)} ${toCode}`)
}

export function convertUnits() {
    const unitInput = document.getElementById('unit-value')
    const validation = validateInput(unitInput)
    
    if (!validation.isValid) {
        View.showResultWay('Введите корректное число')
        return
    }

    const type = document.getElementById('unit-type').value
    const rule = Model.unitConverters[type] // достаю нужный коэф 
    const converted = validation.value * rule.coeff
    
    View.showResultWay(`Результат: ${converted.toFixed(2)} ${rule.unit}`)
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
    const rates = Model.getCurrencyRates()
    View.renderBudget(expenses, rates)
}

export function setupEventListeners() {
    document.getElementById('btn-convert')?.addEventListener('click', convertCurrency)
    document.getElementById('btn-update-rates')?.addEventListener('click', refreshRates)
    
    document.getElementById('unit-value')?.addEventListener('input', convertUnits)
    document.getElementById('unit-type')?.addEventListener('change', convertUnits)
    
    document.getElementById('btn-add-expense')?.addEventListener('click', addExpense)

    document.getElementById('calc-amount')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') convertCurrency()
    })

    document.getElementById('budget-tbody')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const id = parseInt(e.target.getAttribute('data-id'))
            Model.deleteExpenseItem(id)
            recalculateBudget()
        }
    })
}
