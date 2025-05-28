import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';

const EditPost = () => {
    const {id} = useParams()
    const [post, setPost] = useState([])
    const {user} = useContext(AppContext)
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [video, setVideo] = useState('')
    const [link, setLink] = useState('')
    const [youtube, setYoutube] = useState('')

    const [youtubeShow, setYoutubeShow] = useState(false)
    const [linkShow, setLinkShow] = useState(false)
    const [videoShow, setVideoShow] = useState(false)

    const updatePost = (e) => {
        e.preventDefault()
        const postU = {text, video, link, date: post[0].date, poster: user.id, youtube, id: id}
        axios.put(`${import.meta.env.VITE_URI}/post/${id}/updatepost`, postU, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            .then(res => {
                navigate('/')
                return res.data
            })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URI}/post/${id}/post`, {headers: {'Content-Type': 'application/json'}})
          .then((res) => {
            setPost(res.data)
            setText(res.data[0].text)
            setLink(res.data[0].link)
            setVideo(res.data[0].video)
          })
          .catch((err) => {
            console.log(err)
          })
    },[id])

    return (
        <section className='home-page'>
            <div className='feed'>
                <div className='filter-feed'>
                    <h1>Edit Post</h1>
                </div>

                <div className='feed-post'>
                <button onClick={() => console.log(post)}>Show</button>
                    <form onSubmit={updatePost}>
                        <textarea placeholder='Write something' rows='8' onChange={(e) => setText(e.target.value)} value={text}></textarea>
                        <input type='text' placeholder='link' className={`post-input ${linkShow ? '' : 'hidden'}`} onChange={(e) => setLink(e.target.value)} value={link}/>
                        <input type='text' placeholder='video link' className={`post-input ${videoShow ? '' : 'hidden'}`} onChange={(e) => setVideo(e.target.value)} value={video}/> 
                        <input type='text' placeholder='youtube link' className={`post-input ${youtubeShow ? '' : 'hidden'}`} onChange={(e) => setYoutube(e.target.value)} value={youtube}/>
                        <button className='post-btn'>Post</button>
                    </form>
                </div>
                <div className='filter-feed'>
                    <i className='bx bx-link post-op' onClick={() => {setLinkShow(!linkShow); setYoutubeShow(false); setVideoShow(false);}}/>
                    <i className='bx bxl-youtube post-op' onClick={() => {setLinkShow(false); setYoutubeShow(!youtubeShow); setVideoShow(false);}}/>
                    <i className='bx bxs-videos post-op' onClick={() => {setLinkShow(false); setYoutubeShow(false); setVideoShow(!videoShow);}}/>
                </div>
            </div>
        </section>
    );
}

export default EditPost;
