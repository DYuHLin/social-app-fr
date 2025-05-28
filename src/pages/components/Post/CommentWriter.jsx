import React, { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import axios from 'axios';
import PostImg from '../Misc/PostImg';

const CommentWriter = ({postId, commentId}) => {
    const {user} = useContext(AppContext)
    const [text, setText] = useState('')
    const [video, setVideo] = useState('')
    const [link, setLink] = useState('')
    const [youtube, setYoutube] = useState('')
    const [img, setImg] = useState([])

    const [youtubeShow, setYoutubeShow] = useState(false)
    const [linkShow, setLinkShow] = useState(false)
    const [videoShow, setVideoShow] = useState(false)
    const [imgShow, setImgShow] = useState(false)

    const createComment = (e) => {
        e.preventDefault()
        const comment = {text, video, link, date: Date.now(), poster: user.id, post: postId, youtube, comments: commentId}
        axios.post(`${import.meta.env.VITE_URI}/comment/create`, comment, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            .then(res => res.data)
            .then((post) => {
                if(img.length !== 0){
                    for(let i = 0; i < img.length; i++){
                        axios.post(`${import.meta.env.VITE_URI}/image/create`, {image: img[i], comment: post.id}, 
                        {headers: {'Content-Type': 'application/json'}, withCredentials: true})
                    }
                } else{
                    return post
                }
                return post
            })
    }

    return (
        <>
            <form className='comment-form' onSubmit={createComment}>
                <textarea placeholder='Write something' rows='8' onChange={(e) => setText(e.target.value)}></textarea>
                <input type='text' placeholder='link' className={`post-input ${linkShow ? '' : 'hidden'}`} onChange={(e) => setLink(e.target.value)}/>
                <input type='text' placeholder='video link' className={`post-input ${videoShow ? '' : 'hidden'}`} onChange={(e) => setVideo(e.target.value)}/> 
                <input type='text' placeholder='Embed youtube Video' className={`post-input ${youtubeShow ? '' : 'hidden'}`} onChange={(e) => setYoutube(e.target.value)}/> 
                <PostImg setImage={setImg} imgBox={imgShow}/>
                <button className='post-btn'>Comment</button>
            </form>
            <div className='filter-feed'>
                <i className='bx bx-link post-op' onClick={() => {setLinkShow(!linkShow); setImgShow(false); setYoutubeShow(false); setVideoShow(false);}}/>
                <i className='bx bxl-youtube post-op' onClick={() => {setLinkShow(false); setImgShow(false); setYoutubeShow(!youtubeShow); setVideoShow(false);}}/>
                <i className='bx bx-image post-op' onClick={() => {setLinkShow(false); setImgShow(!imgShow); setYoutubeShow(false); setVideoShow(false);}}/>
                <i className='bx bxs-videos post-op' onClick={() => {setLinkShow(false); setImgShow(false); setYoutubeShow(false); setVideoShow(!videoShow);}}/>
            </div>
        </>
    );
}

export default CommentWriter;
