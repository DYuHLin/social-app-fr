import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const Follow = () => {
    const {user} = useContext(AppContext)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [currentFollowing, setCurrentFollowing] = useState([])
    const {id} = useParams()
    const [view, setView] = useState(false)
    const navigate = useNavigate()

    const follow = (other) => {
        try{
            const fllw = {follower: user.id, following: other}
            axios.post(`${import.meta.env.VITE_URI}/follow/create`, fllw, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
            axios.get(`${import.meta.env.VITE_URI}/follow/${id}/followers`, {headers: {'Content-Type': 'application/json'}})
              .then((res) => {
                setFollowers(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
        },[id])

        useEffect(() => {
            axios.get(`${import.meta.env.VITE_URI}/follow/${id}/following`, {headers: {'Content-Type': 'application/json'}})
              .then((res) => {
                setFollowing(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
        },[id])

        useEffect(() => {
            axios.get(`${import.meta.env.VITE_URI}/follow/${user.id}/following`, {headers: {'Content-Type': 'application/json'}})
              .then((res) => {
                setCurrentFollowing(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
        },[user.id])

    return (
        <section className='home-page'>
            <div className='feed'>
                <div className='filter-feed'>
                    <h1>{!view ?'Followers' : 'Following'}</h1> 
                </div>
                <button className='follow-btn' onClick={() => setView(!view)}>View {!view ? 'Following' : 'Followers'}</button>
                {followers.length == 0 && !view ? <p>This user has no followers</p> : followers.length != 0 && !view ? followers.map((flw, key) => {return(
                    <div className='user-search-card' key={key}>
                         <div className='user-info'>
                            <img src={flw.image} alt='Profile image' className='profile-img' />
                            <p className='follow-name' onClick={() => navigate(`/profile/${flw.user_id}`)}>{flw.username}</p>
                        </div>
                        <button className='follow-btn' onClick={() => follow(flw.id)}>{
                            currentFollowing.some((fl) => fl.user_id == flw.id) ? 'Following' : 'Follow'
                        }</button>
                    </div>
                )}) : following.length == 0 && view ? <p>This user is not following anyone</p> : following.length != 0 && view ? following.map((flw, key) => {return(
                    <div className='user-search-card' key={key}>
                         <div className='user-info'>
                            <img src={flw.image} alt='Profile image' className='profile-img' />
                            <p className='follow-name' onClick={() => navigate(`/profile/${flw.user_id}`)}>{flw.username}</p>
                        </div>
                        <button className='follow-btn' onClick={() => follow(flw.user_id)}>Following</button>
                    </div>
                )}) : ''
                }
                
            </div>
        </section>
    );
}

export default Follow;