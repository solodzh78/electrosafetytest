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
                <div className={styles.header__wrapper}>
                    <div className={styles.header__left}>
                        <div className={styles.logo}>
                            <Link className={styles.logo__link} to='/'>
                                <img className={styles.logo__img} src={Logo} alt='Logo'/>
                            </Link>
                        </div>
                        <nav className={styles['nav-menu']}>
                            <Link className={styles['nav-menu__link']} to='/'>Главная</Link>
                            <Link className={styles['nav-menu__link']} to='/tests'>Тесты</Link>
                            <Link className={styles['nav-menu__link']} to='/docs'>Документы</Link>
                            <Link className={styles['nav-menu__link']} to='/about'>О&nbsp;нас</Link>
                        </nav>
                    </div>
                    <div className={styles.header__right}>
                        <div className={styles.user}>
                            <a className={styles.user__link} href='/#'>
                                <img className={styles.user__img} src={Sign} alt='sign'/>
                            </a>
                        </div>
                    </div>
                </div>
                </Container>
            </header>
        )
};
