import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../context/AppContext';

const LikedComments = ({loading}) => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate()
    const [comments, setComments] = useState([])

    const likePost = (comment) => {
        try{
            const like = {post: null, comment: comment, liker: user.id,}
            axios.post(`${import.meta.env.VITE_URI}/likes/likepost`, like, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/likes/${user.id}/allcomments`, {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },[user.id, comments])

    return (
        <>
            {loading && comments.length === 0 ? <p>Loading the likes...</p> : comments.length === 0 ? <p>There are no comment likes</p>:
                comments.map((post, key) => {
                    return(
                    <div className='feed-post' key={key}>
                        <div className='post-info'>
                            <p className='feed-user' onClick={() => navigate(`/profile/${post.userid}`)}>{post.username}</p>
                            <p>{new Date(Number(post.date)).toLocaleString()}</p>
                            <p>Comment</p>
                        </div>
                        <div className='post-content' onClick={() => navigate(`/${post.id}/post`)}>
                            {post.text.trim() != '' ? <p className='feed-content'>{post.text}</p> : ''}
                            {post.link.trim() != '' ? <a href={post.link}>{post.link}</a> : ''}
                            {post.video.trim() != '' ? <div className='vid-container'><video className='video' src={post.video} controls /> </div>: ''}
                            {post.youtube.trim() != '' ? <div className='ytvid' dangerouslySetInnerHTML={{__html: post.youtube}}></div> : ''}
                            {
                                post.images.length != 0 ? 
                                <section className="img-container">
                                    <div className="slider-wrapper">
                                        <div className="slider">
                                            {post.images.map((pic, id) => {
                                                return(
                                                <img id={`slide-${id}`} src={pic.image} alt="posts image" key={id}/>
                                                )
                                            })}
                                        </div>
                                        <div className="slider-nav">
                                            {post.images.map((pic, id) => {
                                                return(
                                                <a href={`#slide-${id}`} key={id}></a>
                                                )
                                            })}
                                        </div>
                                    </div>
                            </section> : ''
                            }
                        </div>
                        <div className='post-actions'>
                            <p className='feed-icons' onClick={() => likePost(post.id)}><i className='bx bx-heart' />{post.likes.length}</p>
                            <p className='feed-icons' onClick={() => navigate(`/${post.id}/comment`)}>View Comments </p>
                        </div>
                    </div>
                    )
                })
            }
        </>
    );
}

export default LikedComments;
