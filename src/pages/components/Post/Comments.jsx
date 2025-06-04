import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../context/AppContext';
import LinkPreview from '../Misc/LinkPreview';

const Comments = ({postId, commentId, reloading2, setReloading2}) => {
    const navigate = useNavigate()
    const {user} = useContext(AppContext)
    const [comments, setComments] = useState([])

    const likePost = (post) => {
        try{
            const like = {post: null, comment: post, liker: user.id,}
            axios.post(`${import.meta.env.VITE_URI}/likes/likecomment`, like, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setReloading2(true)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(postId != null){
            axios.get(`${import.meta.env.VITE_URI}/comment/${postId}/allcomments`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setComments(res.data)
            setReloading2(false)
          })
          .catch((err) => {
            console.log(err)
          })
        } else if(commentId != null) {
            axios.get(`${import.meta.env.VITE_URI}/comment/${commentId}/allcommentscomments`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setComments(res.data)
            setReloading2(false)
          })
          .catch((err) => {
            console.log(err)
          })
        }

    }, [reloading2, postId, commentId, setReloading2])

    return (
        <>
            <h1 className='comment-title'>Comments</h1>
            { reloading2 && comments.length === 0 ? <p>Loading the comments...</p> : comments.length === 0 ? <p>There are no comments right now</p>:
                comments.map((post, key) => {
                    return(
                    <div className='feed-post' key={key}>
                        <div className='post-info'>
                            <p className='feed-user' onClick={() => navigate(`/profile/${post.userid}`)}>{post.username}</p>
                            <p>{new Date(Number(post.date)).toLocaleString()}</p>
                        </div>
                        <div className='post-content'>
                            {post.text.trim() != '' ? <p className='feed-content'>{post.text}</p> : ''}
                            {post.link.trim() != '' ? <LinkPreview url={post.link} /> : ''}
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
                            <p className='feed-icons' onClick={() => likePost(post.id)}><i className={`bx bx-heart ${
                            post.likes.some((lke) => lke.liker == user.id) ? `red` : ''}`} />{post.likes.length}</p>
                            <p className='feed-icons' onClick={() => navigate(`/${post.id}/comment`)}>View Comments </p>
                        </div>
                    </div>
                    )
                })
            }
        </>
    );
}

export default Comments;
