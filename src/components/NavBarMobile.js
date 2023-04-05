import { useNavigate } from "react-router-dom"
import NavButton from "./NavButton"
import { useState,  useEffect } from "react";  
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from "../hooks/useAuth"; 
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { slide as Menu } from 'react-burger-menu'
import useLogout from "../hooks/useLogout"
import { NavLink } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState()
    const {auth} = useAuth()
    const location = useLocation()
    const refresh = useRefreshToken()
    const [username, setUsername] = useState('')
    const logout = useLogout()
    const signOut = async() => {
        await logout();
        navigate('/')
    }


    useEffect(() =>  {
        const verifyRefreshToken = async () => {
            try{
                await refresh()
                setIsLoggedIn(true)
                const user = jwt_decode(auth.accessToken).UserInfo.username
                setUsername(user)
                
            } catch (err) {
                console.error(err)
                setIsLoggedIn(false)
            }
        }
        
        verifyRefreshToken()


    },[location || []])

    

    const Pages = [
        {
            text:'Home',
            func: '/'
        },
        {
            text:'Championship',
            func: '/championship'
        },
        {
            text:'Graph',
            func: '/graph'
        },
        {
            text:'About Me',
            func: '/about'
        }
    ]
    const AccPages = [
        {
            text:'Login',
            func: '/login'
        },
        {
            text:'Register',
            func: '/register'
        }
    ]

    const AccPagesLoggedIn = [
        {
            text:username,
            func: '/userprofile'
        }
    ]
   
    if(isLoggedIn) {
        return(
            <Menu className="hamburger-menu">
                <>
                {Pages.map(({text, func}, index) => (
                    <NavButton key = {index} text = {text} func={func}/>
                ))}
                
                <NavLink to = "/logout" 
                    onClick={signOut}
                    className={({ isActive }) => ( 
                        isActive ? 'nav-bar-button-active' :'nav-bar-button')}>
                        {"Logout".toUpperCase()} 
                </NavLink>
                {AccPagesLoggedIn.map(({text, func}, index) => (
                    <NavButton key = {index} text = {text} func={func}/>
                ))}
                </>                         
            </Menu>
        )
    } else {
        return(
            <Menu className="hamburger-menu">
                {Pages.map(({text, func}, index) => (
                    <NavButton key = {index} text = {text} func={func}/>
                ))}
                {AccPages.map(({text, func}, index) => (
                    <NavButton key = {index} text = {text} func={func}/>
                ))}                          
            </Menu>
        )
    }
}
    

export default NavBar
