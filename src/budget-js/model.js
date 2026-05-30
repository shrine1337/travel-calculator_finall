let budgetExpenses = []

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
