import { useNavigate } from "react-router-dom"
import Championship from "./Championship"
import NavButton from "./NavButton"
const NavBar = () => {
    const navigate = useNavigate()
    const Pages = [
        {
            text:'Home',
            func: () => navigate('/')
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

export default NavBar
