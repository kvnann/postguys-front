import axios from 'axios'
import React from 'react'
import './UserSimple.css'
import enviroment from '../../config'
const UserSimple = (props) => {
    const sendPost = async () => {
        document.querySelector("#simple"+props.user._id + props.postId).classList.add('sent_user')
        setTimeout(()=>{
            document.querySelector("#simple"+props.user._id + props.postId).classList.remove('sent_user')
            document.querySelector("#simple"+props.user._id + props.postId).classList.add('not_sent_user')
        },5000);
        axios.post(`${enviroment.baseUrlBack}/api/post/send`,{
            token:localStorage.getItem("x-access-token"),
            from:props.viewer,
            to:props.user._id,
            postId:props.postId
        }).then(res=>{
            console.log("Post sent!");
        }).catch(e=>{
            console.log(e);
        });
    }
  return (
    <div className="not_sent_user user_simple" onClick={() => sendPost()} id={`simple${props.user._id}${props.postId}`}>
        <div className='sentMessage'>Sent!</div>
        <div className='user_details'>
            <div className="logo"><img src={props.user.ppimage} alt=""/></div>
            <div className="username">{props.user.username}</div>
        </div>
    </div>
  )
}

export default UserSimple