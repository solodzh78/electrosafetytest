import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '../container/Container'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'

export const Layout: React.FC = () => {
    return (
        <>
            <Header />

                <Outlet />

            <Footer />
        </>
    )
}
