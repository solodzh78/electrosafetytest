import React from 'react';
import { Container } from '../../components/container/Container';
import { tests } from '../../assets/variables/tests';
import { Link } from 'react-router-dom';
import styles from './Tests.module.scss';

function Tests() {
    return (
        <Container style={{ paddingTop: '55px' }} className={'main'}>
            <div className={styles.tests}>
                <h1>
                    Список тестов
                </h1>
                <ul>
                    {tests && tests.map(({title, href}) => 
                        <li key={href}>
                            <Link to={`/quiz/${href}`} >
                                <div className={styles['list-item']}>
                                    {title}
                                </div>
                            </Link>
                        </li>)}
                </ul>
            </div>
        </Container>
    )
}

export default Tests