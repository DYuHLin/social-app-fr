import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Suggestions = () => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [following, setFollowing] = useState([])
    const [reloading, setReloading] = useState(false)
    const follow = (other) => {
        try{
            const fllw = {follower: user.id, following: other}
            axios.post(`${import.meta.env.VITE_URI}/follow/create`, fllw, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setReloading(true)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/auth/allusers`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setUsers(res.data)
            setLoading(false)
            setReloading(false)
          })
          .catch((err) => {
            console.log(err)
          })
    },[reloading])

    useEffect(() => {
        if(user.id){
            axios.get(`${import.meta.env.VITE_URI}/follow/${user.id}/following`, {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                setFollowing(res.data)
                setReloading(false)
            })
                .catch((err) => {
                console.log(err)
            })
        } else {
            return
        }
    },[user.id, reloading])
    
    return (
        <div className='suggestions'>
            <div className='latest'>
                <h2>Latest Users</h2>
                <div className='users'>
                { loading && users.length == 0 ? '' : users.length == 0 ? <p>There are no users</p> :
                    users.slice(-3).reverse().map((sug, key) => {return(
                        <div className='user-card' key={key}>
                        <div className='user-info'>
                            <div className='pic-container'>
                                <img src={sug.image} alt='Profile image' className='profile-img-suggestion' />
                            </div>
                            <div className='sug-name'><p className='follow-name' onClick={() => navigate(`/profile/${sug.id}`)}>{sug.username}</p></div>   
                        </div>
                        <button className='follow-btn' onClick={() => follow(sug.id)}>{
                            following.some((fl) => fl.user_id == sug.id) ? 'Following' : 'Follow'
                        }</button>
                    </div>
                    )})
                }
                </div>
                
            </div>
            <div className='most-followed'>
                <h2>Suggestions</h2>
                <div className='users'>{ loading && users.length == 0 ? '' : users.length == 0 ? <p>There are no users</p> :
                    users.sort((a,b) => a.followers.length - b.followers.length).slice(0, 3).map((sug, key) => {return(
                        <div className='user-card' key={key}>
                        <div className='user-info'>
                            <div className='pic-container'>
                                <img src={sug.image} alt='Profile image' className='profile-img-suggestion' />
                            </div>                     
                            <div className='sug-name'><p className='follow-name' onClick={() => navigate(`/profile/${sug.id}`)}>{sug.username}</p></div> 
                        </div>
                        <button className='follow-btn' onClick={() => follow(sug.id)}>{
                            following.some((fl) => fl.user_id == sug.id) ? 'Following' : 'Follow'
                        }</button>
                    </div>
                    )})
                    }
                </div>      
            </div>
        </div>
    );
}

export default Suggestions;
