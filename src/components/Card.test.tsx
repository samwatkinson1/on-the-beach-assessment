import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import data from '../../data.json'
import { currencyFormat, dateFormat, pluralize } from '../util.ts'
import { Card } from './Card.tsx'

describe('Card', () => {
    it('should render', () => {
        const expected = data[0]

        render(<Card data={expected} />)

        expect(screen.getByRole('img', { name: expected.name })).toBeVisible()
        expect(screen.getByRole('heading', { name: expected.name })).toBeVisible()
        expect(screen.getByRole('heading', { name: expected.location })).toBeVisible()
        expect(screen.getAllByTestId('card__star')).toHaveLength(expected.stars)

        const occupants = `${pluralize(expected.occupants.adults, 'Adult', 'Adults')}, ${pluralize(expected.occupants.children, 'children', 'child')} & ${pluralize(expected.occupants.infants as number, 'infant', 'infants')}`
        expect(screen.getByText(occupants)).toBeVisible()

        const date = `${dateFormat(new Date(expected.price.date))} for ${pluralize(expected.price.duration, 'day', 'days')}`
        expect(screen.getByText(date)).toBeVisible()

        expect(screen.getByText(`departing from ${expected.departure_airport}`)).toBeVisible()
        expect(screen.getByRole('heading', { name: expected.location })).toBeVisible()

        const bookNow = `Book now ${currencyFormat(expected.price.subtotal)}`
        expect(screen.getByRole('button', { name: bookNow })).toBeVisible()

        expect(screen.getByRole('button', { name: 'Read more about this hotel' })).toBeVisible()
    })

    it('should toggle overview collapsible content', async () => {
        const expected = data[0]

        render(<Card data={expected} />)
        await userEvent.click(screen.getByRole('button', { name: 'Read more about this hotel' }))

        expect(screen.getByText('Overview')).toBeVisible()
        expect(screen.getByText(expected.description)).toBeVisible()

        await userEvent.click(screen.getByRole('button', { name: 'Read more about this hotel' }))

        expect(screen.getByText('Overview')).not.toBeVisible()
        expect(screen.getByText(expected.description)).not.toBeVisible()
    })
})
