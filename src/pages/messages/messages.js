import React from 'react'
import {Navbar} from '../../components'
import './messages.css'
import enviroment from '../../config'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Messages = () => {
  const [page, setpage] = useState(
    <div className='mt-4'>
      <h1>Please Wait...</h1>
      <Navbar active="messages"/>
    </div>
  );
  const [user, setuser] = useState({})

  useEffect(() => { 
    const auth = async () => {
      var token = localStorage.getItem('x-access-token');
  
      await axios.post(`${enviroment.baseUrlBack}/api/auth`,{
        'token':token
        }).then(res=>{
          setpage(
            <div>
              <Navbar active="messages"/>
              <div className='messages_main'>
                <h1>Coming Soon</h1>
              </div>
            </div>
          );
        }).catch(error=>{
          window.location = '/login'
          localStorage.setItem('x-access-token','');
        });
    }
    return async () => {
      await auth();
      if(!user.username){
        await axios.post(`${enviroment.baseUrlBack}/api/getuser`,{
          token:localStorage.getItem('x-access-token')
        }).then((res)=>{
            setuser(res.data.user);
            console.log(user)
        }).catch(err=>{
            window.location = '/login'
        });
      }
    };
  }, [user]);

  return(
    page
  )
}

export default Messages