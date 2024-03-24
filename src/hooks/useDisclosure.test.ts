import { act, renderHook } from '@testing-library/react'

import { useDisclosure } from './useDisclosure.ts'

describe('useDisclosure', () => {
    it('should return initial state and handlers', () => {
        const { result } = renderHook(useDisclosure)

        expect(result.current.open).toBe(false)
        expect(result.current.onOpen).toBeDefined()
        expect(result.current.onClose).toBeDefined()
        expect(result.current.onToggle).toBeDefined()
    })

    it('should handle onOpen', () => {
        const { result } = renderHook(useDisclosure)

        act(() => result.current.onOpen())

        expect(result.current.open).toBe(true)
    })

    it('should handle onClose', () => {
        const { result } = renderHook(useDisclosure)

        act(() => result.current.onClose())

        expect(result.current.open).toBe(false)
    })

    it('should handle onToggle', () => {
        const { result } = renderHook(useDisclosure)

        act(() => result.current.onToggle())
        expect(result.current.open).toBe(true)

        act(() => result.current.onToggle())
        expect(result.current.open).toBe(false)
    })
})
