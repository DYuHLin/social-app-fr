import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../context/AppContext';
import LinkPreview from '../Misc/LinkPreview';

const UserPosts = ({id}) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [reloading, setReloading] = useState(false)
    const navigate = useNavigate()
    const {user} = useContext(AppContext)

    const likePost = (post) => {
        try{
            const like = {post: post, comment: null, liker: user.id,}
            axios.post(`${import.meta.env.VITE_URI}/likes/likepost`, like, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setReloading(true)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/post/allposts`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setPosts(res.data.filter((post) => { return post.user_id == id }))
            setLoading(false)
            setReloading(false)
          })
          .catch((err) => {
            console.log(err)
          })
    },[reloading, id])

    return (
        <>
            <h1>Posts</h1>       
            {loading && posts.length === 0 ? <p>Loading the posts...</p> : posts.length === 0 ? <p>There are no posts right now</p>:
                posts.map((post, key) => {
                    return(
                    <div className='feed-post' key={key}>
                        <div className='post-info'>
                            <p className='feed-user'>{post.username}</p>
                            <p>{new Date(Number(post.date)).toLocaleString()}</p>
                        </div>
                        <div className='post-content' onClick={() => navigate(`/${post.id}/post`)}>
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
                            <p className='feed-icons'><i className='bx bx-comment' /> </p>
                            {post.user_id == user.id ? <button className='follow-btn' onClick={() => navigate(`/${post.id}/post/edit`)}>update</button> : ''}
                            {post.user_id == user.id ? <button className='follow-btn' onClick={() => navigate(`/${post.id}/post/delete`)}>delete</button> : ''}
                        </div>
                    </div>
                    )
                })
            }
        </>
    );
}

export default UserPosts;
