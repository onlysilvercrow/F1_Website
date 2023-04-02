import { NavLink } from "react-router-dom"

const NavButton = ({text, func}) => {
    return (
        <>
        {/* <button className="nav-bar-button" onClick={func}>
            {text.toUpperCase()}
        </button> */}
        <NavLink to = {func} 
        className={({ isActive }) => ( 
            isActive ? 'nav-bar-button-active' :'nav-bar-button')}>
            {text.toUpperCase()} 
        </NavLink>
        </>
    )
}

export default NavButton