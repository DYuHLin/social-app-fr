import React, { useContext, useEffect, useState } from 'react';
import UserPosts from './components/User/UserPosts';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import UserComments from './components/User/UserComments';

const Profile = () => {
    const {id} = useParams()
    const {user} = useContext(AppContext)
    const navigate = useNavigate()
    const [following, setFollowing] = useState([])

    const [currentUser, setCurrentUser] = useState([])
    const [view, setView] = useState(false)
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/auth/${id}/user`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setCurrentUser(res.data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
    },[id])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/follow/${user.id}/following`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setFollowing(res.data)
            setReloading(false)
          })
          .catch((err) => {
            console.log(err)
          })
    },[reloading, user.id])

    const follow = (other) => {
        try{
            const fllw = {follower: user.id, following: other}
            axios.post(`${import.meta.env.VITE_URI}/follow/create`, fllw, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setReloading(true)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <section className='home-page'>
            <div className='feed'>
            <div className='filter-feed'>
                <h1>Profile</h1>
            </div>
            {loading && currentUser.length == 0 ? '' : currentUser.length == 0 ? '' : <div className='user-profile-info'>
                <div className='profile-card-img'>
                    <img src={currentUser[0].image} alt='Profile image' className='profile-card-image' />
                </div>
                <div className='profile-card-info'>
                    <h3>{currentUser[0].username}</h3>
                    <p>{currentUser[0].description == null ? '' : currentUser[0].description}</p>
                    <div className='followers'>
                        <p className='follow-label' onClick={() => navigate(`followers`)}> {currentUser[0].followers.length} Followers</p>
                        <p className='follow-label' onClick={() => navigate(`followers`)}> {currentUser[0].following.length} Following</p>
                    </div>
                    {currentUser[0].id != user.id ?<button className='follow-profile-btn' onClick={() => follow(currentUser[0].id)}>{
                            following.some((fl) => fl.user_id == currentUser[0].id)  ? 'Following' : 'Follow'
                        }</button> : ''}
                    {currentUser[0].id == user.id && currentUser[0].google_id ? '' :
                    currentUser[0].id == user.id ?<button className='follow-profile-btn' onClick={() => navigate('edit')}>Edit</button> : ''}
                </div>
            </div>}
            <button className='post-btn' onClick={() => setView(!view)}>View {!view ? 'Comments' : 'Posts'}</button>
            {!view ? <UserPosts id={id}/> : <UserComments id={id} />}
            </div>
        </section>
    );
}

export default Profile;
