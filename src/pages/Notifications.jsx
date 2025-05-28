import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Notifications = () => {
    const {user} = useContext(AppContext)
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const deleteNotifications = () => {
        axios.delete(`${import.meta.env.VITE_URI}/notifications/${user.id}/delete`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            .then(res => {
                navigate('/')
                return res.data
        })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/notifications/${user.id}/allnotifications`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setNotifications(res.data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            // toast.error('There was an error fetching the posts')
          })
    },[user.id])

    return (
        <section className='home-page'>
            <div className='feed'>
                <div className='filter-feed'>
                    <h1>Notifications</h1> 
                    <button className='follow-btn' onClick={() => deleteNotifications()}>Clear</button>
                </div>
                {loading && notifications.length === 0 ? <p>Loading the notifications...</p> : notifications.length === 0 ? <p>There are no notifications right now</p>:
                    notifications.map((noti, key) => {return(
                        <div className='notification-card' key={key}>
                            <p>{noti.username} started following you</p>
                        </div>
                    )})
                } 
            </div>
        </section>
    );
}

export default Notifications;
