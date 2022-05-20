import React from 'react';
import { Container } from '../../components/container/Container';
import { tests } from '../../assets/variables/tests';
import { Link } from 'react-router-dom';
import styles from './Tests.module.scss';

function Tests() {
    return (
        <Container style={{ paddingTop: '55px' }} className={ 'main' }>
            <div className={styles.tests}>
                <h1 className={styles.tests__title}>
                    Список тестов
                </h1>
                <ul className={styles.tests__list}>
                    {tests && tests.map(({title, href}) => 
                        <li className={styles['tests__list-item']} key={href}>
                            <Link className={styles.tests__link} to={`/quiz/${href}`} >
                                <div className={styles.tests__test}>
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