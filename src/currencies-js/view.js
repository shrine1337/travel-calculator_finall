export function updateTime(date, timestamp) {
    const updateSpan = document.getElementById('last-time-updated')
    if (updateSpan) {
        const ratesDate = new Date(timestamp)
        updateSpan.innerHTML = `${date.split('T')[0]}<br>
                                Оф курс ЦБ РФ от: ${ratesDate.toLocaleString()}`
    }
}

export function showResult(text) {
    const resultDiv = document.getElementById('currency-result')
    if (resultDiv) {
        resultDiv.textContent = text
    }
}
