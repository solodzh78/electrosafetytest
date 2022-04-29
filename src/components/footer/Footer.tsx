import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../container/Container';
import styles from './Footer.module.scss';


export const Footer: React.FC = function() {
    return (
        <footer className={styles.footer}>
            <Container>
                <h1>Footer</h1>
                <Link to='/'>Root</Link>
                <Link to='/home'>Home</Link>
                <Link to='/about'>About</Link>
            </Container>
        </footer>
        )
};
