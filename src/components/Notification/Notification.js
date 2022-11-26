import React from 'react'
import './Notification.css'
import { useEffect, useState } from 'react';
// import axios from 'axios';
import enviroment from '../../config'
const Notification = (props) => {
  const [page, setpage] = useState();
  const goProfile = (profileId)=>{
    window.location=`/users?userId=${profileId}`
  }
  useEffect(() => {
    switch (props.notificationData.type) {
      case "like":
        setpage(
          <div className="notification" id={`notification_${props.notificationData._id}`}>
              <div className="user" onClick={()=>goProfile(props.notificationData.likedBy._id)}>
                  <div className="logo"><img alt="" src={props.notificationData.likedBy.ppimage}/></div>
                  <div className="username">{props.notificationData.likedBy.username}</div>
              </div>
              <div className="text">
                  Liked your <a style={{color:"brown"}} href={`/posts?postId=${props.notificationData.postId}`}>post!</a>
              </div>
          </div>  
        )
        break;
      case "post":
        setpage(
          <div className="notification" id={`notification_${props.notificationData._id}`}>
              <div className="user" onClick={()=>goProfile(props.notificationData.from._id)}>
                  <div className="logo"><img alt="" src={props.notificationData.from.ppimage}/></div>
                  <div className="username">{props.notificationData.from.username}</div>
                </div>
                <div className="text">
                      Sent you a post by <a href={`/users?userId=${props.notificationData.owner._id}`} className='userLink'>{props.notificationData.owner.username}</a>, click to see it!
                </div>
          </div>
        )
        break;
      case "follow":
        setpage(
          <div className="notification" id={`notification_${props.notificationData._id}`}>
              <div className="user" onClick={()=>goProfile(props.notificationData.followedBy._id)}>
                  <div className="logo"><img alt="" src={props.notificationData.followedBy.ppimage}/></div>
                  <div className="username">{props.notificationData.followedBy.username}</div>
              </div>
              <div className="text">
                  Started following you!
              </div>
          </div>  
        )
        break;
    
      default:
        break;
    }
  },[props]);
  return (
    page
  )
}

export default Notification;