import React from 'react'
import './post.css'
import { useState } from 'react';
import {FaHeart} from 'react-icons/fa';
import {UserSimple} from '../'
import axios from 'axios';

const Post = (props) => {
  const [foundUser, setfoundUser] = useState([]);
  const [liked, setLiked] = useState(props.liked);
  const goProfile = (profileId)=>{
    window.location=`https://postguys-demo.herokuapp.com/users?userId=${profileId}`
  }
  const likeEvent = ()=>{
    
    if(!liked){
      axios.post("https://postguys.herokuapp.com/api/post/like",{
        token:localStorage.getItem("x-access-token"),
        likedBy:props.viewer,
        owner:props.owner,
        postId:props.id
      }).then(res=>{
          console.log(res.data);
      }).catch(e=>{
          console.log(e);
      });
    }
    else{
      axios.post("https://postguys.herokuapp.com/api/post/unlike",{
        token:localStorage.getItem("x-access-token"),
        unlikedBy:props.viewer,
        owner:props.owner,
        postId:props.id
      }).then(res=>{
          console.log(res.data);
      }).catch(e=>{
          console.log(e);
      });
    }
    setLiked(current => !current);
  }
  const sendTo = async () => {
    document.querySelector(`#${props.postId} #other`).classList.remove("other_normal");
    document.querySelector(`#${props.postId} #other`).classList.add("other_send");
    document.querySelector(`#${props.postId} #other #sendToCancelButton`).classList.add("d-flex");
    document.querySelector(`#${props.postId} #other #sendToCancelButton`).classList.remove("d-none");
  };
  const sendToCancel = () => {
    document.querySelector(`#${props.postId} #other`).classList.add("other_normal");
    document.querySelector(`#${props.postId} #other`).classList.remove("other_send");
    document.querySelector(`#${props.postId} #other #sendToCancelButton`).classList.remove("d-flex");
    document.querySelector(`#${props.postId} #other #sendToCancelButton`).classList.add("d-none");
  };
  const searchUser = () =>{
    const keyword = document.querySelector(`#${props.postId} .other .send_model .blank #input_search`).value;
    console.log(keyword)
    if(keyword && keyword.length>0){
      setfoundUser([]);
      document.querySelector(`#${props.postId} .other .send_model .search_results .loading`).innerHTML = "Loading...";
      axios.post("https://postguys.herokuapp.com/api/search_users",{
        keyword: keyword,
        token:localStorage.getItem("x-access-token")
      }).then(res=>{
        setfoundUser(res.data);
        document.querySelector(`#${props.postId} .other .send_model .search_results .loading`).innerHTML = "";
      }).catch(e=>{
        document.querySelector(`#${props.postId} .other .send_model .search_results .loading`).innerHTML = "No user with this username";
      })
    }
    else{
      document.querySelector(`#${props.postId} .other .send_model .search_results .loading`).innerHTML = "";
    }
  }
  return (
    <div className="post" id={props.postId}>
        <div className='user_details'>
          <div className="user" onClick={()=>goProfile(props.owner)}>
              <div className="logo"><img src={props.ppLink} alt=""/></div>
              <div className="username">{props.username}</div>
              <div className="date">posted on {props.date}</div>
          </div>
        </div>
        <div className="other other_normal" id='other'>
            <div className="text">
                {props.postText}
            </div>

            <div className="actions">
              <div className={`btn_like ${liked?'liked':''}`} onClick={likeEvent}><FaHeart size={40} /></div>
              <button className="btn" id="sendToButton" onClick={sendTo}>Send to</button>
              <button className="btn d-none" id="sendToCancelButton" onClick={sendToCancel}>Cancel</button>
            </div>
            <div className='send_model'>
              <div className="blank">
                <span>Send to:</span> 
                <input className='input_search' id="input_search" onChange={()=>searchUser()} placeholder="Search"/>
              </div>
              <div className='search_results'>
                <div className='loading'></div>
                <div className={`found_user ${foundUser?'d-flex':'d-none'}`}>
                {foundUser.map(foundUserSingle => {
                    if(foundUserSingle){
                      return(<UserSimple key={props.id} postId={props.id} viewer={props.viewer} user={foundUserSingle} />)
                    }
                    else{
                      return 0
                    }
                  }
                )}
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Post