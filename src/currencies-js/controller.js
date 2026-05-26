import * as Model from './model.js'
import * as View from './view.js'

export async function refreshRates() {
    const data = await Model.loadRates()
    View.updateTime(data.Date, data.Timestamp)
}

export function convertCurrency() {
    const sumInput = document.querySelector('#calc-amount')
    const amount = parseFloat(sumInput.value)
    const fromCode = document.getElementById('from-currency').value
    const toCode = document.getElementById('to-currency').value
    
    const currencyRates = Model.getCurrencyRates()
    const fromRate = currencyRates[fromCode]
    const toRate = currencyRates[toCode]
    const result = amount * (fromRate / toRate)

    if (isNaN(amount) || sumInput.value.trim() === '') {
        View.showResult('Введите сумму')
        return
    }

    View.showResult(`${amount.toLocaleString('ru-RU')} ${fromCode} = ${result.toFixed(2)} ${toCode}`)
}

export function setupEventListeners() {
    const btn = document.querySelector('#btn-convert')
    const sumInput = document.querySelector('#calc-amount')
    const refreshBtn = document.getElementById('btn-update-rates')

    if (btn) {
        btn.addEventListener('click', convertCurrency)
    }

    if (sumInput && btn) {
        sumInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') btn.click()
        })
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            await refreshRates()
            convertCurrency()
        })
    }
}
