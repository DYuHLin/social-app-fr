import React, { useContext, useEffect, useState } from 'react';
import Feed from './components/home/Feed';
import Suggestions from './components/home/Suggestions';
import Sidebar from './components/home/Sidebar';
import axios from 'axios';
import AppContext from '../context/AppContext';

const Home = () => {
  const {user} = useContext(AppContext)
    const [posts, setPosts] = useState([])
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const [feed, setFeed] = useState(false)

    const setFilter = () => {
      try{
        axios.get(`${import.meta.env.VITE_URI}/post/allposts`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setPosts(res.data.filter((pst) => following.some((use) => use.user_id == pst.user_id)))
            setFeed(true)
            return res.data
          })
          .catch((err) => {
            console.log(err)
          })
      } catch(err){
        console.log(err)
      }
    }

    const setOriginal = () => {
      try{
        axios.get(`${import.meta.env.VITE_URI}/post/allposts`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setPosts(res.data)
            setFeed(true)
            return res.data
          })
          .catch((err) => {
            console.log(err)
          })
      } catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
      try{
        axios.get(`${import.meta.env.VITE_URI}/post/allposts`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setPosts(res.data)
            setLoading(false)
            setReloading(false)
            return res.data
          })
          .catch((err) => {
            console.log(err)
          })
      } catch(err){
        console.log(err)
      }
      },[reloading])

      useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/follow/${user.id}/following`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setFollowing(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },[user.id])

    return (
        <section className='home-page'>
            <Sidebar />
            <Feed posts={posts} loading={loading} setReloading={setReloading} setOriginal = {setOriginal} setFilter={setFilter} feed={feed}/>
            <Suggestions />
        </section>
    );
}

export default Home;
