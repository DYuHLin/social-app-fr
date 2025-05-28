import React, { useContext, useState } from 'react';
import axios from 'axios'
import AppContext from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const {setUser} = useContext(AppContext)
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        const login = {username: username, password: password}
        try{
            const res = await axios.post(`${import.meta.env.VITE_URI}/auth/login`, login, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            if(res.data == 'username'){
                setError('This username is incorrect or does not exist')
            } else if(res.data == 'password'){
                setError('This password is incorrect')
            } else {
                setUser(res.data.user[0])
                navigate('/')
            }

        } catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <h1 className='start-title'>Login</h1>
            <form className='start-form' onSubmit={login}>
            <input type='text' required placeholder='username' name='username' onChange={(e) => setUsername(e.target.value)}/>
            <input type='password' required placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
                
            <button className='auth-btn'>Login</button>
            </form>
            <p className='error'>{error}</p>
        </>
    );
}

export default LoginForm;
