import axios from 'axios';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {user, setUser} = useContext(AppContext)
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        try{
            axios.post(`${import.meta.env.VITE_URI}/auth/logout`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
                .then((res) => {
                    setUser(false)
                    navigate('/gettingstarted')
                    return res.data
                })
        } catch(err){
            console.log(err)
        }
    }

    const deleteAcc = (e) => {
        e.preventDefault()
        try{
            axios.delete(`${import.meta.env.VITE_URI}/auth/${user.id}/deleteuser`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
                .then((res) => {
                    setUser(false)
                    navigate('/gettingstarted')
                    return res.data
                })
        } catch(err){
            console.log(err)
        }
    }

    return (
        <section className='home-page'>
            <div className='feed'>
                <div className='filter-feed'>
                    <h1>Logout or Delete Profile</h1>
                </div>

                <div className='feed-post'>
                    <form onSubmit={logout}>
                        <h1 className='comment-title'>Logout</h1>
                        <p>Are you sure you want to logout?</p>
                        <button className='post-btn'>Logout</button>
                    </form>
                    
                    <form onSubmit={deleteAcc}>
                        <h1 className='comment-title'>Delete</h1>
                        <p>Are you sure you want to delete your profile?</p>
                        <button className='post-btn'>Delete</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Logout;
