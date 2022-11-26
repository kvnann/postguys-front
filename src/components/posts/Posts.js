import React from 'react'
import {Post} from '../'
import './posts.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import enviroment from '../../config'
const Posts = (props) => {
  const [page, setpage] = useState(<h1>Please Wait...</h1>);
  const viewer = props.viewer
  const owner = props.owner
  
  
  useEffect(() => {
    let postsIndex = [];
    const getPosts = async()=>{

      switch (props.method) {
        case 1:
          for(let postIndex of owner.feed){
            postsIndex.push(postIndex);
          } 
          break;
        case 2:
          for(let postIndex of owner.posts){
            postsIndex.push(postIndex);
          } 
          break;
        default:
          break;
      }


      if(postsIndex.length>0){
        await axios.post(`${enviroment.baseUrlBack}/api/post/get_posts`,{
          token:localStorage.getItem('x-access-token'),
          keys:postsIndex
        }).then(res=>{
          setpage(
            <div className='posts'>
              {res.data.map(post => (
                <Post id={post._id} key={post._id} postId={`post_${post._id}`} viewer={viewer._id} owner={post.user._id} liked={post.likes.indexOf(viewer._id)>-1 ? "liked" : ""} ppLink={post.user.ppimage} username={post.user.username} date={post.publishDateString} postText={post.text} />
              ))}
            </div>
          )
        }).catch(err=>{
          console.log(err);
        });
      }
      else{
        setpage(
          <div>No Posts Found</div>
        )
      }
    }
    return async () => {
      await getPosts();
    };
  }, [viewer,props.method])
  
  return (
    page
  )
}

export default Posts