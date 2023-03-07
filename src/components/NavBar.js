import { useNavigate } from "react-router-dom"
import NavButton from "./NavButton"
import { useState,  useEffect } from "react";  
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from "../hooks/useAuth"; 
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";



const NavBar = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {auth} = useAuth()
    const location = useLocation()
    const refresh = useRefreshToken()
    const [username, setUsername] = useState('username')


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
            func: () => navigate('/' , 0)
        },
        {
            text:'Championship',
            func: () => navigate('/championship')
        },
        {
            text:'New Page',
            func: () => navigate('/newpage')
        }
    ]
    const AccPages = [
        {
            text:'Login',
            func: () => navigate('/login')
        },
        {
            text:'Register',
            func: () => navigate('/register')
        }
    ]

    const AccPagesLoggedIn = [
        {
            text:'Logout',
            func: () => navigate('/logout')
        },
        {
            text:username,
            func: () => (navigate('/userprofile'))
        }
    ]
    
    if(isLoggedIn) {
        return (
            <>
                <div className="nav-bar">
                    <div className="nav-width">
                        <div className="nav-pages">
                            {Pages.map(({text, func}) => (
                                <NavButton text = {text} func={func}/>
                            ))}
                        </div>
                        <div className="acc-nav">
                            {AccPagesLoggedIn.map(({text, func}) => (
                                <NavButton text = {text} func={func}/>
                            ))}                          
                        </div>
                    </div>
                </div>
            </>
        )
    } else{
        return (
            <>
                <div className="nav-bar">
                    <div className="nav-width">
                        <div className="nav-pages">
                            {Pages.map(({text, func}) => (
                                <NavButton text = {text} func={func}/>
                            ))}
                        </div>
                        <div className="acc-nav">
                            {AccPages.map(({text, func}) => (
                                <NavButton text = {text} func={func}/>
                            ))}                          
                        </div>
                    </div>
                </div>
            </>
        )
    }
    

}
    

export default NavBar
