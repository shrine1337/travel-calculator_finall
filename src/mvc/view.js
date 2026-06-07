export function updateTime(date, timestamp) {
    const updateSpan = document.getElementById('last-time-updated')
    if (updateSpan) {
        const ratesDate = new Date(timestamp)
        const cleanDate = date.includes('T') ? date.split('T')[0] : date
        updateSpan.innerHTML = `Курсы обновлены: ${cleanDate}<br>
                                Оф курс ЦБ РФ от: ${ratesDate.toLocaleString()}`
    }
}

export function showResultCurrencie(text) {
    const resultDiv = document.getElementById('currency-result')
    if (resultDiv) {
        resultDiv.textContent = text
    }
}

export function showResultWay(text) {
    const div = document.getElementById('unit-result')
    if (div) {
        div.textContent = text
    }
}

export function renderBudget(expenses, rates) {
    const tbody = document.getElementById('budget-tbody')
    const totalSpan = document.getElementById('budget-total')
    
    if (!tbody) return
    tbody.innerHTML = ''

    let totalRub = 0
    expenses.forEach(item => {
        const tr = document.createElement('tr')
        const rate = rates[item.currency] || 1
        const costInRub = item.amount * rate
        totalRub += costInRub

        tr.innerHTML = `
            <td>${item.category}</td>
            <td>${item.amount.toFixed(2)} ${item.currency}</td>
            <td>${costInRub.toFixed(2)}</td>
            <td><button class="btn-delete" data-id="${item.id}">Х</button></td>
        `
        tbody.appendChild(tr)
    })

    if (totalSpan) {
        totalSpan.innerText = totalRub.toLocaleString('ru-RU', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        })
    }
}
