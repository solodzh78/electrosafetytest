import React from 'react'
import { Outlet } from 'react-router-dom'
import { CheckTicket } from '../checkTicket/CheckTicket'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'

export const Layout: React.FC = () => {
    return (
        <>
            <Header />

                <Outlet />

            <Footer />
            <CheckTicket />
        </>
    )
}
