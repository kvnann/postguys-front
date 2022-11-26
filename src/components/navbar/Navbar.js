import React from 'react'
import './Navbar.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

import enviroment from '../../config'
const Navbar = (props) => {
  const linkTo = (dir) => {
    window.location = './' + dir
  }  
  const [user, setuser] = useState({});
  const [activeFeed, setActiveFeed] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState(false);
  const [activeAccounts, setActiveAccounts] = useState(false);
  const [activeMessages, setActiveMessages] = useState(false);
  useEffect(() => {
    switch (props.active) {
        case 'feed':
            setActiveFeed(true);
            break;
        case 'notifications':
            setActiveNotifications(true);
            break;
        case 'accounts':
            setActiveAccounts(true);
            break;
        case 'messages':
            setActiveMessages(true);
            break;
        default:
            break;
      }
    axios.post(`${enviroment.baseUrlBack}api/getuser`,{
        token:localStorage.getItem('x-access-token')
    }).then(res=>{
        setuser(res.data.user);
    }).catch(err=>{
        window.location='/login'
    });
  }, [props]);

  return (
      <div className="header">
        <div className="mnavbar">
            <div className={`mnavbar_item ${activeFeed?"active":""}`}  id="feed" onClick={()=>{linkTo('feed')}}>
               Feed
            </div>
            <div className={`mnavbar_item ${activeNotifications?"active":""}`}  id="notifications" onClick={()=>{linkTo('notifications')}}>
               Notifications
            </div>
            <div className={`mnavbar_item ${activeMessages?"active":""}`}  id="messages" onClick={()=>{linkTo('messages')}}>
                Messages
            </div>
            <div className={`mnavbar_item ${activeAccounts?"active":""}`} id="accounts" onClick={()=>{linkTo('account')}}>
                <img width="26" className='ppimage' height='26' src={user.ppimage} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Navbar
