import React from 'react'
import './AccountCard.css'
const AccountCard = (props) => {
  return (
    <div className="account_card">
        <div className="user">
            <div className="logo"><img src={props.ppLink} alt=""/></div>
            <div className="username">{props.username}</div>
            <div className="joinDate">joined on {props.joinDate}</div>
        </div>
        <div className='stats'>
            <div className=''>{props.likeCount} Likes</div>
            <div className=''>{props.shareCount} Shares</div>
            <div className=''>{props.postCount} Posts</div>
            <div className=''>{props.followers} Followers</div>
        </div>
    </div>
  )
}

export default AccountCard