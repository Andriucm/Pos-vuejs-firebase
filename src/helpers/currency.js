export const formatCurrency = amount => Number(amount).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR'
})