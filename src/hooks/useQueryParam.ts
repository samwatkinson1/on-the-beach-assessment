import { useCallback, useEffect, useState } from 'react'

export type UseQueryParam = <T = string>(
    param: string,
    defaultValue?: T | null
) => [T | null, (value: T | null) => void]

export const useQueryParam: UseQueryParam = (param, defaultValue = null) => {
    const location = window.location

    const [value, setValue] = useState<typeof param | null>(defaultValue)

    const onChange = useCallback(
        (value: typeof param | null) => {
            history.pushState({}, '', `${location.pathname}?${param}=${value}`)
            setValue(value)
        },
        [location.pathname, param]
    )

    useEffect(() => {
        if (defaultValue) onChange(defaultValue)
    }, [defaultValue, onChange])

    return [value, onChange]
}
