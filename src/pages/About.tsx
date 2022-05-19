import React from 'react'
import { Container } from '../components/container/Container'

export const About: React.FC = function () {
    return (
        <Container style={{ paddingTop: '55px' }} className={'main'}>
            <div>
                <h1>
                    About
                </h1>
            </div>
        </Container>
    )
}

export default About