import React, { useContext } from 'react';
import axios from 'axios';
import AppContext from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LinkPreview from '../Misc/LinkPreview';

const Feed = ({posts, loading, setReloading, setOriginal, setFilter, feed}) => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate()

    const likePost = (post) => {
        try{
            const like = {post: post, comment: null, liker: user.id,}
            axios.post(`${import.meta.env.VITE_URI}/likes/likepost`, like, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setReloading(true)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div className='feed'>
            <div className='filter-feed'>
                <span className={`${!feed ? 'active' : ''}`} onClick={() => setOriginal()}>All</span>
                <span className={`${feed ? 'active' : ''}`} onClick={() => setFilter()}>Following</span>
            </div>
            { loading && posts.length === 0 ? <p>Loading the posts...</p> : posts.length === 0 ? <p>There are no posts right now</p>:
                posts.sort((a, b) => {return new Date(Number(b.date)) - new Date(Number(a.date))}).map((post, key) => {
                    return(
                    <div className='feed-post' key={key}>
                        <div className='post-info'>
                            <p className='feed-user' onClick={() => navigate(`/profile/${post.user_id}`)}>{post.username}</p>
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
                            <p className='feed-icons' onClick={() => navigate(`/${post.id}/post`)}>View Comments </p>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    );
}

export default Feed;