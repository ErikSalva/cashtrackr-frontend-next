

export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(quantity)
}

export function formatDate(isoString: string){
    const date = new Date(isoString)

    const formatted = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })

    return formatted.format(date)
}