import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../container/Container';
import styles from './Header.module.scss';
import Logo from '../../assets/images/logo.png';
import Sign from '../../assets/images/sign.svg';

export const Header: React.FC = function() {
    return (
            <header className={styles.header}>
                <Container>
                    <nav className={styles.nav}>
                        <div className={styles.nav_left}>
                            <Link className={styles.navLink} to='/'>
                                <img className={styles.logoImg} src={Logo} alt='Logo'/>
                            </Link>
                            <Link className={styles.navLink} to='/'>Главная</Link>
                            <Link className={styles.navLink} to='/tests'>Тесты</Link>
                            <Link className={styles.navLink} to='/docs'>Документы</Link>
                        <Link className={styles.navLink} to='/about'>О&nbsp;нас</Link>
                        </div>
                    <div className={styles.nav_right}>
                            <a href='/#'>
                                <img src={Sign} alt='sign'/>
                            </a>
                        </div>
                    </nav>
                </Container>
            </header>
        )
};
