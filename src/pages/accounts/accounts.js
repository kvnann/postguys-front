import React from 'react';
import {Navbar, AccountCard, Posts} from '../../components'
import './accounts.css';
import enviroment from "../../config"
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Account = ()=>{
  const [user, setuser] = useState({});
    const [page, setpage] = useState(
      <div className='mt-4'>
        <h1>Please Wait...</h1>
        <Navbar active="accounts"/>
      </div>
    );
    useEffect(() => { 
      const logout = ()=>{
        axios.post('https://postguys.herokuapp.com/api/logout',{
          user:user,
          token:localStorage.getItem('x-access-token')
        }).then(res=>{
          localStorage.setItem('x-access-token','')
          window.location='/login';
        }).catch(err=>{
          alert(err);
        });
      }
      const auth = () => {
          var token = localStorage.getItem('x-access-token');
          axios.post('https://postguys.herokuapp.com/api/auth',{
            'token':token
          }).then(res=>{
            setpage(
              <div>
              <Navbar active="accounts"/>
              <div className='account_main'>
                  <AccountCard ppLink={user.ppimage} followers={user.followers.length} username={user.username} joinDate={user.joinDate} likeCount={user.likeCount} shareCount={user.shareCount} postCount={user.postCount}/>
                  <div>
                  <button className="btn black-edition" onClick={()=>{window.location=`/user_edit`}}>Edit Profile</button>
                      <button className="btn black-edition" onClick={()=>logout()}>Log Out</button>
                      </div>
                  </div>
                  <div className='posts'>
                    <Posts viewer={user} owner={user} method={2}/>
                  </div>
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

export default Account;