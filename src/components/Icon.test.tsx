import { render, screen } from '@testing-library/react'

import { Icon } from './Icon.tsx'

describe('Icon', () => {
    it('should render', () => {
        render(<Icon name="star" data-testid="icon" />)

        expect(screen.getByTestId('icon')).toBeVisible()
        expect(screen.getByTestId('icon')).toHaveClass('fa-star')
    })

    it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)('should render as size "%s"', size => {
        render(<Icon name="star" size={size} data-testid="icon" />)

        expect(screen.getByTestId('icon')).toHaveClass(`fa-${size}`)
    })
})
