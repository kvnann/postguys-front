import React from 'react'
import './feed.css'
import {Navbar,Posts} from '../../components'

import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Feed = () => {
  const [page, setpage] = useState(
    <div>
      <h1>Please Wait...</h1>
      <Navbar active="feed"/>
    </div>
  );
  const [user, setuser] = useState({})



  useEffect(() => { 
    const auth = async () => {
      var token = localStorage.getItem('x-access-token');
        await axios.post('https://postguys.herokuapp.com/api/auth',{
          'token':token
        }).then(res=>{
          setpage(
            <div className='feed_main'>
              <Navbar active="feed"/>
              <div className='links'>
                <div class='btn' onClick={()=>{window.location="/posts/create"}}>Create a post!</div>
              </div>
              {/* 1- Feed 2- User posts */}
              <Posts viewer={user} owner={user} method={1}/>
            </div>
          );
        }).catch(error=>{
          window.location = '/login'
          localStorage.setItem('x-access-token','');
        });
    }
    return async () => {
      
      if(!user.username){
        await axios.post("https://postguys.herokuapp.com/api/getuser",{
          token:localStorage.getItem('x-access-token')
        }).then(async(res)=>{
          setuser(res.data.user);
          
        }).catch(err=>{
            window.location = '/login'
        });
      }
      else{
        auth();
      }
    };
  }, [user]);

  return(
    page
  )
  
}
export default Feed