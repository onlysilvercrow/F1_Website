import {Outlet} from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import NavBar from "./NavBar"

const Layout = () => {
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
                <NavBar />
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