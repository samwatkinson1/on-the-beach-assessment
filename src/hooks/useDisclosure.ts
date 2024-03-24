import { useCallback, useState } from 'react'

export const useDisclosure = () => {
    const [open, setIsOpen] = useState(false)

    const onClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onOpen = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onToggle = useCallback(() => {
        if (open) onClose()
        else onOpen()
    }, [open, onOpen, onClose])

    return { open, onOpen, onClose, onToggle }
}
