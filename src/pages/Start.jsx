import React, {useContext, useState} from 'react';
import LoginForm from './components/Authentication/LoginForm';
import RegisterForm from './components/Authentication/RegisterForm';
import MainLogo from '../assets/img/6.png'
import axios from 'axios'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const [forms, setForms,] = useState(true)
    const {setUser, user} = useContext(AppContext)
    const navigate = useNavigate()

    const googleLogin = (e) => {
        e.preventDefault()
        const path = `${import.meta.env.VITE_URI}/auth/google`
        window.open(path, '_self')
    }

    const guestLogin = async () => {
        const login = {username: import.meta.env.VITE_GUESTNAME, password: import.meta.env.VITE_GUESTNAME}
            try{
                const res = await axios.post(`${import.meta.env.VITE_URI}/auth/login`, login, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
                setUser(res.data.user[0])
                navigate('/')
            } catch(err){
                console.log(err)
            }
    }

    return (
        <section className='start-page'>
            <div className='start-forms'>
                <div className='mini-logo'>
                    <img src={MainLogo} className='logo-mini' />
                </div>
                    {forms ? <LoginForm /> : <RegisterForm setForms = {setForms}/>}
                    <button onClick={() => setForms(!forms)} className='auth-btn'>{forms ? 'Register' : 'Login'}</button>
                    <form onSubmit={googleLogin}>
                        <button className='google-auth-btn'>Continue with Google</button>
                    </form>  
                    <span className='guest-login' onClick={guestLogin}>Guest Login</span>
                <button onclick={()=> console.log(user)}>Show</button>
            </div>
            <div className='begin-screen'>
                <div className='start-logo'>
                    <img src={MainLogo} className='logo-img' />
                </div>
            </div>
        </section>
    );
}

export default Start;
