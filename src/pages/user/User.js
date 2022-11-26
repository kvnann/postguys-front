import axios from 'axios';
import React from 'react'
import {useLocation} from "react-router-dom";
import { useEffect, useState } from 'react';
import {Navbar, AccountCard, Posts} from '../../components'
import enviroment from '../../config'

const User = () => {
    const search = useLocation().search;
    let userId = new URLSearchParams(search).get('userId');
    userId = parseInt(userId)
    const [userdata, setuserdata] = useState(false)
    const [user, setuser] = useState({});
    const [following, setfollowing] = useState(false);
    const [page, setpage] = useState(
        <div>
          <h1>Please Wait...</h1>
          <Navbar active="feed"/>
        </div>
    );
    useEffect(() => {
      try{
        document.querySelector("#follow-btn").innerHTML = following?"Unfollow":"Follow";
      }
      catch(e){}
    }, [following])
    const followBtn = async()=>{
    
      document.querySelector("#follow-btn").innerHTML = "Please wait..";

      await axios.post(`${enviroment.baseUrlBack}/api/follow`,{
        token:localStorage.getItem('x-access-token'),
        user1:user._id,
        user2:userdata._id,
        state:following?false:true
      }).then(res=>{
        setfollowing(current=>!current)
      }).catch(err=>{
        alert("An error occured :(");
      });

    }
   
    useEffect(() => {
      try{
        document.querySelector("#follow-btn").innerHTML = following?"Unfollow":"Follow";
      }
      catch(e){}
        const auth = async() => {
            var token = localStorage.getItem('x-access-token');
            await axios.post(`${enviroment.baseUrlBack}/api/auth`,{
              'token':token
            }).then(res=>{
              setpage(
                <div>
                <Navbar active="feed"/>
                  <div className='account_main'>
                      <AccountCard followers={userdata.followers.length} ppLink={userdata.ppimage} username={userdata.username} joinDate={userdata.joinDate} likeCount={userdata.likeCount} shareCount={userdata.shareCount} postCount={userdata.postCount}/>
                      <div>
                        <button className="btn black-edition" id='follow-btn' onClick={()=>followBtn()}>Please Wait...</button>
                      </div>
                  </div>
                  <div className='posts'>
                    <Posts viewer={user} owner={userdata} method={2} />
                  </div>
                </div>
              );
            }).catch(error=>{
              window.location = '/login';
              localStorage.setItem('x-access-token','');
            });
        }
        return async () => {
          if(userdata === false){
            await axios.post(`${enviroment.baseUrlBack}/api/getuserid`,{
              token:localStorage.getItem('x-access-token'),
              userId:userId
            }).then(res=>{  
                setuserdata(res.data.user)
              }).catch(err=>{
                console.log(err);
              });
            }
            if(!user.username){
              await axios.post(`${enviroment.baseUrlBack}/api/getuser`,{
                token:localStorage.getItem('x-access-token')
              }).then((res)=>{
                setuser(res.data.user);
                if(res.data.user.follow.indexOf(userdata._id)>-1){
                  setfollowing(true)
                } 
              }).catch(err=>{
                window.location='/login'
            });
          }
          else{
            auth();
          }
        };
    }, [user,userdata]);


    return (
        page
    )
}

export default User
