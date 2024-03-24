import './Button.css'

import { FC, HTMLProps, PropsWithChildren, ReactNode } from 'react'

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
    return (
        <button
            {...props}
            type="button"
            className={`${variant} ${props.className}`}
            data-active={isActive}
        >
            <span>{children}</span>
            {icon}
        </button>
    )
}
