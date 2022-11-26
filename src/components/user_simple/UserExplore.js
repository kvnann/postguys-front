import axios from 'axios'
import React from 'react'
import './UserSimple.css'
import enviroment from '../../config'
const UserExplore = (props) => {
  return (
    <div className="not_sent_user user_simple user_explore" onClick={() => {window.location=`/users?userId=${props.user._id}`}} id={`simple${props.user._id}`}>
        <div className='user_details'>
            <div className="logo"><img src={props.user.ppimage} alt=""/></div>
            <div className="username">{props.user.username}</div>
        </div>
    </div>
  )
}

export default UserExplore