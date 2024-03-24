import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import App from './App.tsx'
import { SortField } from './hooks/useSort.ts'

describe('App', () => {
    it('should render', () => {
        render(<App />)

        const aside = screen.getByRole('complementary')
        expect(aside).toBeVisible()
        expect(within(aside).getAllByRole('button')).toHaveLength(3)

        const main = screen.getByRole('main')
        expect(main).toBeVisible()
        expect(within(main).getAllByTestId('card')).toHaveLength(3)
    })

    it.each`
        name                | field
        ${'alphabetically'} | ${SortField.alpha}
        ${'by price'}       | ${SortField.price}
        ${'by star rating'} | ${SortField.star}
    `('should handle setting "$field" sort field', async ({ name, field }) => {
        vi.stubGlobal('history', { pushState: vi.fn() })

        render(<App />)
        const button = screen.getByRole('button', { name: `sort ${name}` })
        await userEvent.click(button)

        expect(window.history.pushState).toBeCalledWith({}, '', `/?sort=${field}`)
        expect(button).toHaveAttribute('data-active', 'true')
        expect(button).toHaveAttribute('data-sort', field)
    })
})
