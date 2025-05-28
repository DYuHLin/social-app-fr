import axios from 'axios';
import React, { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import ProfileImg from '../Misc/ProfileImg'

const RegisterForm = ({setForms}) => {
    const {defaultImg} = useContext(AppContext)
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [img, setImg] = useState(defaultImg)
    const [confirmPassword, setConfirmPassword] = useState('')

    const register = (e) => {
        e.preventDefault()
        const updatedUsername = username.replace(/\s/g, '')

        const register = {username: updatedUsername, password: password, description: '', image: img}
        try{
            if(confirmPassword !== password){
                setError('These passwords do not match')
            }else{
                axios.post(`${import.meta.env.VITE_URI}/auth/register`, register, {headers: {'Content-Type': 'application/json'}})
                    .then(res => res.data)
                    .then(status => {
                        if(status == 'username'){
                            setError('This username is taken')
                        } else if(status == 'success'){
                            setForms(true)
                        }
                    })
            }    
        } catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <h1 className='start-title'>Register</h1>
            <form className='start-form' onSubmit={register}>
            <input type='text' placeholder='username' required name='username' onChange={(e) => setUsername(e.target.value)}/>
            <input type='password' placeholder='password' required name='password' onChange={(e) => setPassword(e.target.value)}/>
            <input type='password' placeholder='confirm password' required name='confirm' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <ProfileImg setImage={setImg} />
            <button className='auth-btn'>Register</button>
            </form>
            <p className='error'>{error}</p>
        </>
    );
}

export default RegisterForm;
