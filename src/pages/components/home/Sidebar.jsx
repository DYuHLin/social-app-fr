import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../../context/AppContext';

const Sidebar = () => {
    const {user} = useContext(AppContext)
    return (
        <div className='sidebar'>
            <ul className='side-list'>
                <li className='side-item'><Link to='/'><i className='bx bx-home'/> <p className='side-text'>Home</p></Link></li>
                <li className='side-item'><Link to='/create'><i className='bx bx-plus-circle'/> <p className='side-text'>Create</p></Link></li>
                <li className='side-item'><Link to='/users'><i className='bx bx-user' /> <p className='side-text'>Users</p></Link></li>
                <li className='side-item'><Link to='/notifications'><i className='bx bx-bell' /> <p className='side-text'>Notifications</p></Link></li>
                <li className='side-item'><Link to='/likes'><i className='bx bx-like' /> <p className='side-text'>Likes</p></Link></li>
                <li className='side-item'><Link to={`/profile/${user.id}`}><img src={user.image} className='sidebar-pic'/> <p className='side-text'>Profile</p></Link></li>
                <li className='side-item'><Link to='/logout'><i className='bx bx-log-out' /> <p className='side-text'>Logout</p></Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
