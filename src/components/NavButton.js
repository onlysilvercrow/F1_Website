const NavButton = ({text, func}) => {
    return (
        <>
        <button className="nav-bar-button" onClick={func}>
            {text.toUpperCase()}
        </button>
        </>
    )
}

export default NavButton