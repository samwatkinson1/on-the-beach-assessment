import { renderHook } from '@testing-library/react'

import data from '../../data.json'
import { sortByAlpha, sortByPrice, sortByStar, SortField, useSort } from './useSort.ts'

describe('useSort', () => {
    it('should return default non-sorted state', () => {
        const { result } = renderHook(() => useSort(null, data))

        expect(result.current).toEqual(expect.arrayContaining(data))
    })

    it.each`
        field              | sorter
        ${SortField.alpha} | ${sortByAlpha}
        ${SortField.price} | ${sortByPrice}
        ${SortField.star}  | ${sortByStar}
    `(`should return data sorted by "$field"`, ({ field, sorter }) => {
        const expected = sorter(data)

        const { result } = renderHook(() => useSort(field, data))

        expect(result.current).toEqual(expect.arrayContaining(expected))
    })
})
