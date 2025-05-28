import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const UserList = () => {
    const {user} = useContext(AppContext)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [following, setFollowing] = useState([])
    const [search, setSearch] = useState('')
    const [reloading, setReloading] = useState(false)
    const navigate = useNavigate()

    const follow = (other) => {
        try{
            const fllw = {follower: user.id, following: other}
            axios.post(`${import.meta.env.VITE_URI}/follow/create`, fllw, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setReloading(true)
            navigate('/')
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
        axios.get(`${import.meta.env.VITE_URI}/follow/${user.id}/following`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setFollowing(res.data)
            setReloading(false)
          })
          .catch((err) => {
            console.log(err)
          })
    },[user.id, reloading])

    return (
        <section className='home-page'>
            <div className='feed'>
                <div className='filter-feed'>
                    <h1>Users</h1> 
                </div>
                <input type='text' placeholder='search users' className='search-input' onChange={((e) => setSearch(e.target.value))}/>
                {loading && users.length == 0 ? <p>Loading users...</p> : users.length == 0 ? <p>There are no users...</p> :
                    users.filter((item) => {return search.toLocaleLowerCase() == '' ? users : item.username.toLocaleLowerCase().includes(search)}).map((userM, key) => {return(
                        <div className='user-search-card' key={key}>
                            <div className='user-info' onClick={() => navigate(`/profile/${userM.id}`)}>
                                <img src={userM.image} alt='Profile image' className='profile-img-list' />
                                <p className='follow-name'>{userM.username}</p>
                            </div>
                            {userM.id == user.id ? '' : <button className='follow-btn' onClick={() => follow(userM.id)}>{
                            following.some((fl) => fl.user_id == userM.id) ? 'Following' : 'Follow'
                        }</button>}
                        </div>
                    )})
                }
            </div>
        </section>
    );
}

export default UserList;
