import './Button.css'

import { FC, HTMLProps, PropsWithChildren, ReactNode, useMemo } from 'react'

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    icon?: ReactNode
    isActive?: boolean
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
    variant = 'primary',
    icon,
    isActive,
    children,
    ...props
}) => {
    const classes = useMemo(
        () => [variant, props.className].filter(Boolean).join(' '),
        [variant, props.className]
    )

    return (
        <button {...props} type="button" className={classes} data-active={isActive}>
            <span>{children}</span>
            {icon}
        </button>
    )
}
