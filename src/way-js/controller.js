import * as Model from './model.js'
import * as View from './view.js'

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

export function convertUnits() {
    const unitInput = document.getElementById('unit-value')
    const validation = validateInput(unitInput)
    
    if (!validation.isValid) {
        View.showResult('Введите корректное число')
        return
    }
    
    const type = document.getElementById('unit-type').value
    const rule = Model.unitConverters[type]
    const converted = validation.value * rule.coeff
    
    View.showResult(`Результат: ${converted.toFixed(2)} ${rule.unit}`)
}

export function setupEventListeners() {
    const unitInput = document.getElementById('unit-value')
    const unitType = document.getElementById('unit-type')

    if (unitInput) {
        unitInput.addEventListener('input', convertUnits)
    }
    
    if (unitType) {
        unitType.addEventListener('change', convertUnits)
    }
}
