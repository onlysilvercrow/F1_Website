import useLogout from "../hooks/useLogout"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const logout = useLogout()
    const navigate = useNavigate()
    const signOut = async() => {
        await logout();
        navigate('/')
    }
    

    return (
        <section className="acc-form">
        <button onClick={signOut}>Sign Out</button>
        </section>
    )
}

export default Logout