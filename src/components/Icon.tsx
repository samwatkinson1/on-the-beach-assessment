import { FC, HTMLProps } from 'react'

export interface IconProps extends Omit<HTMLProps<HTMLElement>, 'size'> {
    name: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const Icon: FC<IconProps> = ({ name, size = 'xl', ...props }) => {
    return <i {...props} className={`fa-solid fa-fw fa-${size} fa-${name}`} />
}
