import React from 'react';
import { imgUpload } from './ImageUpload';

const ProfileImg = ({setImage}) => {

    const UploadImage = async (files) => {
        setImage(await imgUpload(files[0]))
      }

    return (
        <>
        <input type="file" lable="Image" name="myFile" id="file-upload" accept='.jpeg, .png, .jpg' onChange={(e) => {UploadImage(e.target.files)}}/>      
        </>
    );
}

export default ProfileImg;
