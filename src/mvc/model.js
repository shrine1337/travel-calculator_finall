let currentValues = {}
let budgetExpenses = []

export async function loadRates() {
    try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        const data = await response.json()
        currentValues = {
            RUB: 1,
            USD: data.Valute.USD.Value / data.Valute.USD.Nominal,
            EUR: data.Valute.EUR.Value / data.Valute.EUR.Nominal,
            CNY: data.Valute.CNY.Value / data.Valute.CNY.Nominal,
            UAH: data.Valute.UAH.Value / data.Valute.UAH.Nominal
        }
        return data
    } catch (error) {
        console.error('Ошибка загрузки API курсов:', error)
        currentValues = { RUB: 1, USD: 92.5, EUR: 100.2, CNY: 12.8, UAH: 2.3 }
        const today = new Date().toISOString().split('T')[0]
        return { Date: today, Timestamp: new Date() }
    }
}

export function getCurrencyRates() {
    return currentValues
}

export const unitConverters = {
    'mile-km': { coeff: 1.60934, unit: 'км' },
    'km-mile': { coeff: 1 / 1.60934, unit: 'миль' },
    'lbs-kg': { coeff: 0.453592, unit: 'кг' },
    'kg-lbs': { coeff: 1 / 0.453592, unit: 'фунтов' }
}

export function getBudgetExpenses() {
    return budgetExpenses
}

export function addExpenseItem(category, amount, currency) {
    const item = {
        id: Date.now(),
        category,
        amount,
        currency
    }
    budgetExpenses.push(item)
    localStorage.setItem('travel_budget_list', JSON.stringify(budgetExpenses))
}

export function deleteExpenseItem(id) {
    budgetExpenses = budgetExpenses.filter(item => item.id !== id)
    localStorage.setItem('travel_budget_list', JSON.stringify(budgetExpenses))
}

export function loadBudgetFromStorage() {
    const saved = localStorage.getItem('travel_budget_list')
    if (saved) budgetExpenses = JSON.parse(saved)
}
