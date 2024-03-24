import './App.css'

import type { MouseEvent } from 'react'

import data from '../data.json'
import { Button } from './components/Button.tsx'
import { Card } from './components/Card.tsx'
import { Icon } from './components/Icon.tsx'
import { useQueryParam } from './hooks/useQueryParam.ts'
import { SortField, useSort } from './hooks/useSort.ts'

function App() {
    const [sort, setSort] = useQueryParam<SortField>('sort', SortField.price)

    const sorted = useSort(sort, data)

    function onClick(e: MouseEvent<HTMLButtonElement>) {
        setSort(e.currentTarget.dataset.sort as SortField)
    }

    return (
        <>
            <aside>
                <menu>
                    <Button
                        icon={<Icon name="arrow-up-a-z" />}
                        isActive={sort === SortField.alpha}
                        data-sort={SortField.alpha}
                        onClick={onClick}
                    >
                        sort <strong>alphabetically</strong>
                    </Button>
                    <Button
                        icon={<Icon name="sterling-sign" />}
                        isActive={sort === SortField.price}
                        data-sort={SortField.price}
                        onClick={onClick}
                    >
                        sort by <strong>price</strong>
                    </Button>
                    <Button
                        icon={<Icon name="star" />}
                        isActive={sort === SortField.star}
                        data-sort={SortField.star}
                        onClick={onClick}
                    >
                        sort by <strong>star rating</strong>
                    </Button>
                </menu>
            </aside>
            <main>
                {sorted.map(item => (
                    <Card key={item.id} data={item} data-testid="card" />
                ))}
            </main>
        </>
    )
}

export default App
