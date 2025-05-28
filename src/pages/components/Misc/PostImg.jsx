import React, { useState } from 'react';
import { imgUpload } from './ImageUpload';


const PostImg = ({setImage, imgBox}) => {
    const [loading, setLoading] = useState(true)
    const [upload, setUpload] = useState(false)
    const uploadImage = async (files) => {
        setUpload(true)
        let linkArr = []    
        try{
            for(let i = 0; i < files.length; i++){
                const data = await imgUpload(files[i])
                linkArr.push(data)   
            }           
            console.log(linkArr)
            setImage(linkArr)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
        <input className={imgBox ? '' : 'hidden'} type="file" multiple={true} lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg, .gif' onChange={(e) => {uploadImage(e.target.files)}}/>
        {upload ? <p>{loading ? 'Uploading...' : 'Completed'}</p> : ''}        
    </>
  )
}

export default PostImg;
