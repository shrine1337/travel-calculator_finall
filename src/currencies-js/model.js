let currentValues = {}

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
        return { Date: 'Ошибка сети', Timestamp: new Date() }
    }
}

    export function getCurrencyRates() {
        return currentValues
    }