import {useRef, useState, useEffect, useStore} from 'react';
import useAuth from '../hooks/useAuth';
import {useNavigate, useLocation} from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('')
    },[user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken})
            
            setUser('');
            setPwd('')
            navigate(from, {replace: true})
        } catch (err) {
            if(!err?.response){
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401){
                setErrMsg('Unauthorised')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()          
        }


    }


    return(
        <section className="acc-form">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label htmlFor="username">USERNAME:</label>
                    <input  
                        type="text" 
                        id="username" 
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="password">PASSWORD:</label>
                    <input  
                        type="password" 
                        id="password" 
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </div>
                <div className='form-button'>
                    <button style={{
                        width:  "100%"
                    }}>SIGN IN</button>
                </div>
            </form>
            <p className='text-under-form'>
                DON'T HAVE AN ACCOUNT?<br />
                <span className="line">
                    {/*router link here*/}
                    <a href = "https://ambitious-pebble-02008e903.2.azurestaticapps.net/register">REGISTER</a>
                </span>
            </p>
        </section>
    )
}
export default Login