import { act, renderHook } from '@testing-library/react'

import { useQueryParam } from './useQueryParam.ts'

describe('useQueryParam', () => {
    it('should return state and handler', () => {
        const expected = 'default'

        const { result } = renderHook(() => useQueryParam('sort', expected))
        const [value, onChange] = result.current

        expect(value).toBe(expected)
        expect(onChange).toBeDefined()
    })

    it('should handle changing param', () => {
        const expected = 'test'
        vi.stubGlobal('history', { pushState: vi.fn() })

        const { result } = renderHook(() => useQueryParam('sort'))
        const [_, onChange] = result.current

        act(() => onChange(expected))

        expect(result.current[0]).toBe(expected)
        expect(window.history.pushState).toBeCalledWith({}, '', `/?sort=${expected}`)
    })
})
