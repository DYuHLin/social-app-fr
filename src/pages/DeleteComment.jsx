import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteComment = () => {
    const {id} = useParams()
    const [comment, setComment] = useState([])
    const navigate = useNavigate()

    const deleteComment = (e) => {
        e.preventDefault()
        axios.delete(`${import.meta.env.VITE_URI}/comment/${comment[0].id}/deletecomment`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            .then(res => {
                navigate('/')
                return res.data
        })
    }
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/comment/${id}/comment`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setComment(res.data)
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
                    <form onSubmit={deleteComment}>
                        <h1 className='comment-title'>Delete</h1>
                        <p>Are you sure you want to delete this comment?</p>
                        <button className='post-btn'>Delete</button>
                    </form>
                    
                </div>
            </div>
        </section>
    );
}

export default DeleteComment;
