import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(false)
    const defaultImg = `${import.meta.env.VITE_DEFAULT}`

    useEffect(() => {
        try{
            axios.get(`${import.meta.env.VITE_URI}/auth/account`, {withCredentials: true, headers: {'Content-Type': 'application/json'}})
             .then(res => {
                 console.log(res.data)
                 setUser(res.data)
             });
        } catch(err){
            console.log(err)
        }
    },[])

    return (
        <AppContext.Provider value={{setUser, user, defaultImg}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
