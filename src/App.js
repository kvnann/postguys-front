import React from 'react';
import Account from './pages/accounts/accounts';
import Messages from './pages/messages/messages';
import Notifications from './pages/notifications/notifications';
import Feed from './pages/feed/feed';
import Login from './pages/login/login';
import Register from './pages/register/register';
import CreatePost from './pages/createPost/createPost';
import User from './pages/user/User';
import EditProfile from './pages/edit_profile/editProfile';
import Explore from './pages/explore/explore';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {
BrowserRouter as Router,
useRoutes,
} from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Feed /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/feed", element: <Feed /> },
    { path: "/messages", element: <Messages /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/account", element: <Account /> },
    { path: "/posts/create", element: <CreatePost /> },
    { path: "/users", element: <User /> },
    { path: "/user_edit", element: <EditProfile /> },
    { path: "/explore", element: <Explore /> }
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;