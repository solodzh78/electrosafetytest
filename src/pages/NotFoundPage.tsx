import React from 'react'
import { Container } from '../components/container/Container'

function NotFoundPage() {
    return (
        <Container style={{ paddingTop: '55px' }} className={ 'main' }>
            <div>
				<h1>
					Error 404. Page not found
				</h1>
			</div>
		</Container>
    )
}

export default NotFoundPage