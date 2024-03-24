import './Card.css'

import { FC, HTMLProps } from 'react'

import { useDisclosure } from '../hooks/useDisclosure.ts'
import { Data } from '../types.ts'
import { currencyFormat, dateFormat, pluralize } from '../util.ts'
import { Button } from './Button.tsx'
import { Icon } from './Icon.tsx'

export interface CardProps extends HTMLProps<HTMLDivElement> {
    data: Data
}

export const Card: FC<CardProps> = ({ data, ...props }) => {
    const { open, onToggle } = useDisclosure()

    return (
        <div {...props} className="card">
            <div className="card__header">
                <img src={data.img} alt={`${data.name}`} />

                <section className="card__details">
                    <div>
                        <h1>{data.name}</h1>
                        <h2>{data.location}</h2>
                        <div className="card__stars">
                            {Array.from({ length: data.stars }).map((_, i) => (
                                <Icon
                                    key={`${data.id}-star-${i}`}
                                    name="star"
                                    size="md"
                                    data-testid="card__star"
                                />
                            ))}
                        </div>
                        <p className="card__occupants">
                            {pluralize(data.occupants.adults, 'Adult', 'Adults')},{' '}
                            {pluralize(data.occupants.children, 'children', 'child')}
                            {typeof data.occupants.infants === 'number'
                                ? ` & ${pluralize(data.occupants.infants, 'infant', 'infants')}`
                                : null}
                        </p>
                        <p className="card__duration">
                            {dateFormat(new Date(data.price.date))} for{' '}
                            {pluralize(data.price.duration, 'day', 'days')}
                        </p>
                        <p className="card__departure">departing from {data.departure_airport}</p>
                    </div>
                    <Button variant="secondary" className="card__book">
                        Book now <br />
                        <span className="card__price">{currencyFormat(data.price.subtotal)}</span>
                    </Button>
                </section>

                <Button
                    variant="primary"
                    icon={<Icon name={`chevron-${open ? 'down' : 'right'}`} />}
                    className="card__overview_toggle"
                    onClick={onToggle}
                >
                    <strong>Read more</strong> about this hotel
                </Button>
            </div>

            <section className="card__overview" style={{ display: open ? undefined : 'none' }}>
                <h2>
                    <strong>Overview</strong>
                </h2>
                <p>{data.description}</p>
            </section>
        </div>
    )
}
