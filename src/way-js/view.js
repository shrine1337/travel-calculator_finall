export function showResult(text) {
    const div = document.getElementById('unit-result')
    if (div) {
        div.textContent = text
    }
}
