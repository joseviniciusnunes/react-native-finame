export function formatToMoneyReal(value) {
    if (value === null || value === undefined) {
        return 'R$ -,--';
    }
    return `R$ ${parseFloat(value).toFixed(2)}`.replace('.', ',');
}

export function formatToMoney(value) {
    if (value === null || value === undefined) {
        return '0,00';
    }
    return `${parseFloat(value).toFixed(2)}`.replace('.', ',');
}