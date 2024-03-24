import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Button } from './Button.tsx'

describe('Button', () => {
    it.each(['primary', 'secondary'] as const)('should render as "%s" variant', variant => {
        render(<Button variant={variant}>inner</Button>)

        const button = screen.getByRole('button')

        expect(button).toBeVisible()
        expect(button).toHaveAttribute('type', 'button')
        expect(button).toHaveClass(variant)
        expect(button).toHaveTextContent('inner')
    })

    it('should render given icon as a child', () => {
        const expected = 'icon'

        render(<Button icon={<div>{expected}</div>}>inner</Button>)
        const button = screen.getByRole('button')

        expect(within(button).getByText(expected)).toBeVisible()
        expect(button).toHaveTextContent('inner')
    })

    it('should apply className to rendered button', () => {
        const expected = 'test'

        render(<Button className={expected} />)
        const button = screen.getByRole('button')

        expect(button).toHaveClass(expected)
    })

    it('should apply data-active when isActive prop is true', () => {
        render(<Button isActive />)

        const button = screen.getByRole('button')

        expect(button).toHaveAttribute('data-active', 'true')
    })

    it('should handle click events', async () => {
        const mock = vi.fn()

        render(<Button onClick={mock} />)
        await userEvent.click(screen.getByRole('button'))

        expect(mock).toHaveBeenCalledOnce()
    })

    it('should not handle click events when disabled', async () => {
        const mock = vi.fn()

        render(<Button disabled onClick={mock} />)
        await userEvent.click(screen.getByRole('button'))

        expect(mock).not.toHaveBeenCalled()
    })
})
