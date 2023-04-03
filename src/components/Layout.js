import {Outlet} from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import NavBarMobile from "./NavBarMobile"
import NavBar from "./NavBar"
// import { useLocation } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
const Layout = () => {
    // activePage = useLocation().pathname
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1101px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
    return(
        <div style={{
            minHeight: "100vh",
            width:"100vw",
            maxWidth: "100%",
            display:  "flex",
            flexDirection: "column",
            justifyContent:"space-between"
        }}>
        <div style = {{display: "flex", flexDirection:"column", flexGrow:1}}>
                {isTabletOrMobile && <NavBarMobile />}
                {isDesktopOrLaptop && <NavBar />}
                <Header/>
                <div className="Body">
                <Outlet />
                </div>
            </div>
            <div style = {{display: "flex", flexDirection:"column"}}>
                <Footer />
            </div>
        </div>

    )
}
export default Layout