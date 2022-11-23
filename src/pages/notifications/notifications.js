import React from 'react'
import {Navbar, Notification} from '../../components'
import './notifications.css'

import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Notifications = () => {
  const [page, setpage] = useState(<h1>Please Wait...</h1>);
  const [user, setuser] = useState({})

  
  useEffect(() => { 
    const auth = async () => {
      var token = localStorage.getItem('x-access-token');
  
        await axios.post('https://postguys.herokuapp.com/api/auth',{
          'token':token
        }).then(res=>{
          setpage(
            <div className='mt-4'>
            <Navbar active="notifications"/>
            <div className='notifications'>
              {user.notifications.map(notification => (
                <Notification key={notification._id} notificationData={notification} />
              ))}
              </div>
            </div>
          );
        }).catch(error=>{
          // localStorage.setItem('x-access-token','');
          // window.location = '/login'
        });
    }
    return async () => {
      await auth();
      if(!user.username){
        await axios.post("https://postguys.herokuapp.com/api/getuser",{
          token:localStorage.getItem('x-access-token')
        }).then((res)=>{
            setuser(res.data.user);
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

export default Notifications