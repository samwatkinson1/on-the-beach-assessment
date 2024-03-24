import { useMemo } from 'react'

import { Data } from '../types.ts'

function sortByAlpha(data: Data[]) {
    return data.sort((a, b) => a.name.localeCompare(b.name))
}

function sortByPrice(data: Data[]) {
    return data.sort((a, b) => b.price.subtotal - a.price.subtotal)
}

function sortByStar(data: Data[]) {
    return data.sort((a, b) => b.stars - a.stars)
}

export enum SortField {
    alpha = 'alpha',
    price = 'price',
    star = 'star'
}

export const useSort = (sort: SortField | null, data: Data[]) => {
    const sorted = useMemo(() => {
        switch (sort) {
            case SortField.alpha:
                return sortByAlpha(data)
            case SortField.price:
                return sortByPrice(data)
            case SortField.star:
                return sortByStar(data)
            default:
                return data
        }
    }, [data, sort])

    return sorted
}
