import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../container/Container';
import styles from './Header.module.scss';
import Logo from '../../assets/images/logo.png';

export const Header: React.FC = function() {
    return (
            <header className={styles.header}>
                <Container>
                    <nav className={styles.nav}>
                        <Link className={styles.navLink} to='/'>
                            <img className={styles.logoImg} src={Logo} alt='Logo'/>
                        </Link>
                        <Link className={styles.navLink} to='/home'>Home</Link>
                        <Link className={styles.navLink} to='/about'>About</Link>
                    </nav>
                </Container>
            </header>
        )
};
