import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <>
            <Nav />

            <Outlet />

            <Footer />
        </>
    )
}

export default Layout