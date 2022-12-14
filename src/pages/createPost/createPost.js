import React from 'react'
import "./createPost.css"
import { useState } from 'react'
import axios from 'axios'
import enviroment from '../../config'
const CreatePost = () => {
  const [text, settext] = useState();
  const newPost = ()=>{
    axios.post(`${enviroment.baseUrlBack}/api/post/create`,{
        token:localStorage.getItem('x-access-token'),
        postText:text
    }).then(res=>{
        window.location = '/account'
    }).catch(e=>{
        console.log(e);
    });
  }
  return (
    <div className="create_post">
        <div className='form'>
            <div className='display-4'>Create a post!</div>
            <div className='inputs'>
                <textarea className='input' id="postText" onChange={(e)=>{settext(e.target.value)}} maxLength={200} rows={7} placeholder='What do you think?'/>
            </div>
            <button onClick={()=>{window.location="/feed"}}  className="btn">Back</button>
            <button className='btn' onClick={()=>newPost()}>Submit</button>
        </div>
    </div>
  )
}

export default CreatePost;
