import { useCallback, useEffect, useState } from 'react'

export const useQueryParam = <T = string>(
    param: string,
    defaultValue: T | null = null
): [T | null, (value: T | null) => void] => {
    const [value, setValue] = useState<T | null>(defaultValue)

    const onChange = useCallback(
        (value: T | null) => {
            const pathname = window.location.pathname
            window.history.pushState({}, '', `${pathname}?${param}=${value}`)
            setValue(value)
        },
        [param]
    )

    useEffect(() => {
        if (defaultValue) onChange(defaultValue)
    }, [defaultValue, onChange])

    return [value, onChange]
}
