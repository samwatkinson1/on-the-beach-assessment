import { format } from 'date-fns'

export function pluralize(count: number, singular: string, plural: string, locale = 'en-GB') {
    const pluralRules = new Intl.PluralRules(locale)
    const grammaticalNumber = pluralRules.select(count)
    switch (grammaticalNumber) {
        case 'one':
            return count + ' ' + singular
        case 'other':
            return count + ' ' + plural
        default:
            throw new Error('Unknown: ' + grammaticalNumber)
    }
}

export function currencyFormat(value: number, locale = 'en-GB') {
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'GBP' })
    return formatter.format(value)
}

export function dateFormat(value: Date) {
    return format(value, 'do MMMM yyyy')
}
