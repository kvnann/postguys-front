import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./explore.css"
import {UserExplore} from "../../components"
import enviroment from "../../config"

const Explore = () => {
    const [viewer, setviewer] = useState(false);
    const [foundUser, setfoundUser] = useState([]);
    const goProfile = (profileId)=>{
      window.location=`https://postguys-demo.herokuapp.com/users?userId=${profileId}`
    }

    useEffect(() => {
        axios.post(`${enviroment.baseUrlBack}/api/getuser`,{
            token:localStorage.getItem('x-access-token')
        }).then(res=>{
            setviewer(res.data.user)
        }).catch(err=>{
            // window.location="/login"
        });
    }, []);

    const searchUser = () =>{
        const keyword = document.querySelector(`.send_model #explore_input`).value;
        console.log(keyword)
        if(keyword && keyword.length>0){
          setfoundUser([]);
          document.querySelector(`.send_model .search_results .loading`).innerHTML = "Loading...";
          axios.post("https://postguys.herokuapp.com/api/search_users",{
            keyword: keyword,
            token:localStorage.getItem("x-access-token")
          }).then(res=>{
            setfoundUser(res.data);
            document.querySelector(`.send_model .search_results .loading`).innerHTML = "";
          }).catch(e=>{
            setfoundUser([]);
            document.querySelector(`.send_model .search_results .loading`).innerHTML = "No user with this username";
          })
        }
        else{
          document.querySelector(`.send_model .search_results .loading`).innerHTML = "";
        }
      }
  return (  
    <div className='send_model main_explore'>
        <div className='display-4 mb-5'>Explore new users!</div>
      <input className='input_search' id="explore_input" onChange={()=>searchUser()} placeholder="Search"/>
      <div className='search_results'>
        <div className='loading'></div>
        <div className={`found_user ${foundUser?'d-flex':'d-none'}`}>
          {foundUser.map(foundUserSingle => {
              if(foundUserSingle){
                return(<UserExplore key={viewer._id} viewer={viewer} user={foundUserSingle} />)
              }
              else{
                return 0
              }
            }
          )}
          </div>
        </div>
    </div>
  )
}

export default Explore
