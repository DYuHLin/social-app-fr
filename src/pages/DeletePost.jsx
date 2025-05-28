import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePost = () => {
    const {id} = useParams()
    const [post, setPost] = useState([])
    const navigate = useNavigate()

    const deletePost = (e) => {
        e.preventDefault()
        axios.delete(`${import.meta.env.VITE_URI}/post/${post[0].id}/deletepost`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            .then(res => {
                navigate('/')
                return res.data
        })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/post/${id}/post`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setPost(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },[id])

    return (
        <section className='home-page'>
            <div className='feed'>
                <div className='filter-feed'>
                    <h1>Delete Post</h1>
                </div>

                <div className='feed-post'>
                    <form onSubmit={deletePost}>
                        <h1 className='comment-title'>Delete</h1>
                        <p>Are you sure you want to delete this post?</p>
                        <button className='post-btn'>Delete</button>
                    </form>
                    
                </div>
            </div>
        </section>
    );
}

export default DeletePost;
