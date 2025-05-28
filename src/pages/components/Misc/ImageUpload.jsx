import axios from 'axios'

export const imgUpload = async (files) => {
    const formData = new FormData()
    formData.append('file', files)
    formData.append('upload_preset', 'jag6ma0t')
    
    const { data } = await axios.post(`${import.meta.env.VITE_PIC}`, formData, {withCredentials: false})
    const url = data?.secure_url
    return url
}