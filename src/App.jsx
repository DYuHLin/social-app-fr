import React, { useContext } from 'react'
import {Outlet} from 'react-router-dom'
import './assets/style.css'
import AppContext from './context/AppContext'
import axios from 'axios'
import Start from './pages/Start'

axios.defaults.withCredentials = true

function App() {

  const {user} = useContext(AppContext)

  return (
    <div className='root-component'>
      <main>
        {!user ? <Start /> : <Outlet/>}
      </main>
    </div>
  )
}

export default App
