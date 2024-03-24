import { FC } from 'react'

export interface IconProps {
    name: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const Icon: FC<IconProps> = ({ name, size = 'xl' }) => {
    return <i className={`fa-solid fa-fw fa-${size} fa-${name}`} />
}
