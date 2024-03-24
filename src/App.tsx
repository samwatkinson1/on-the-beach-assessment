import './App.css'

import data from '../data.json'
import { Button } from './components/Button.tsx'
import { Card } from './components/Card.tsx'
import { Icon } from './components/Icon.tsx'

// todo: add sorting

function App() {
    return (
        <>
            <aside>
                <menu>
                    <Button icon={<Icon name="arrow-up-a-z" />}>
                        sort <strong>alphabetically</strong>
                    </Button>
                    <Button icon={<Icon name="sterling-sign" />}>
                        sort by <strong>price</strong>
                    </Button>
                    <Button icon={<Icon name="star" />}>
                        sort by <strong>star rating</strong>
                    </Button>
                </menu>
            </aside>
            <main>
                {data.map(item => (
                    <Card key={item.id} data={item} />
                ))}
            </main>
        </>
    )
}

export default App
