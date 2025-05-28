import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import Start from './pages/Start';
import Home from './pages/Home';
import Create from './pages/Create';
import Post from './pages/Post';
import Likes from './pages/Likes';
import UserList from './pages/UserList';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Follow from './pages/Follow';
import Logout from './pages/Logout';
import EditProfile from './pages/EditProfile';
import EditPost from './pages/EditPost';
import EditComment from './pages/EditComment';
import CommentPage from './pages/CommentPage';
import DeletePost from './pages/DeletePost';
import DeleteComment from './pages/DeleteComment';

function Routes(){

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/gettingstarted' element={<Start/>} />   
            <Route index element={<Home/>} />
            <Route path='/create' element={<Create/>} />
            <Route path='/:id/post' element={<Post/>} />
            <Route path='/:id/comment' element={<CommentPage/>} />
            <Route path='/likes' element={<Likes/>} />
            <Route path='/users' element={<UserList/>} />
            <Route path='/notifications' element={<Notifications/>} />
            <Route path='/profile/:id' element={<Profile/>} />
            <Route path='/profile/:id/followers' element={<Follow/>} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile/:id/edit' element={<EditProfile />} />
            <Route path='/:id/post/edit' element={<EditPost />} />
            <Route path='/:id/post/delete' element={<DeletePost />} />
            <Route path='/:id/comment/edit' element={<EditComment />} />
            <Route path='/:id/comment/delete' element={<DeleteComment />} />
        </Route>
    ))

    return <RouterProvider router={router}/>;
}

export default Routes;
