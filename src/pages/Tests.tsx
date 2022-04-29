import React from 'react';
import { Container } from '../components/container/Container';
import { tests } from '../assets/variables/tests';
import { Link } from 'react-router-dom';

function Tests() {
    return (
        <Container style={{paddingTop: '55px'}}>
            <div>
                <h1>
                    Список тестов
                </h1>
                <ul>
                    {tests && tests.map(({title, href}) => 
                        <li key={href}>
                            <Link to={`/quiz/${href}`}>{title}</Link>
                        </li>)}
                </ul>
            </div>
        </Container>
    )
}

export default Tests