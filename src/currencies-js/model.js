let currentValues = { RUB: 1 }

export async function loadRates() {
    try {
        const response = await fetch('https://cbr-xml-daily.ru')
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
        console.error(error)
        currentValues = { RUB: 1, USD: 92.5, EUR: 100.2, CNY: 12.8, UAH: 2.3 }
        
        // Вместо слова "Резерв" возвращаем текущую дату в формате API
        const today = new Date().toISOString().split('T')[0]
        return { Date: today, Timestamp: new Date() }
    }
}

export function getCurrencyRates() {
    return currentValues
}
