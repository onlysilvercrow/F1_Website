import { useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import jwt_decode from "jwt-decode";

const Header = () => {
    const {auth} = useAuth()
    const user = jwt_decode(auth.accessToken).UserInfo.username
    const PageName= {
        "/newpage": "New Page",
        "/": "Home",
        "/championship": "Championship",
        "/register": "Register",
        "/login": "Login",
        "/homepage": "Home",
        "/logout" :"Logout",
        "/userprofile" :`User Profile: ${user}`
    }
    const location = useLocation()
    return (
    
    <header className="Header">{PageName[location.pathname].toUpperCase()}</header>
  )
}

export default Header