import React from 'react'
import "./editProfile.css"
import enviroment from "../../config"
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditProfile = () => {
  const [username, setusername] = useState("Please wait...");
  const [user, setuser] = useState();
  const [imagename, setimagename] = useState();
  const [image, setimage] = useState();

  const imageUpload = async ()=>{
    const imageformData = new FormData();
    imageformData.append("image", image);
    imageformData.append("username", username);
    await axios.post(`${enviroment.baseUrlBack}api/upload_files`,imageformData,{
            headers:{'Content-Type': 'multipart/form-data'}
        }).then(res=>{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.success').innerHTML = "Image uploaded!";
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.errorShow').innerHTML = "";
            setimagename(`${enviroment.baseUrlBack}/uploads/${res.data.imagename}`);
        }).catch(err=>{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.success').innerHTML = "";
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.errorShow').innerHTML = "Image couldn't uploaded, please try again";
        });
    }

  useEffect(() => {
    
    if(user){
        setusername(user.username)
        if(!imagename){
            setimagename(user.ppimage)
        }
        document.querySelector(`.editProfile .imageUpload #uploadedImage`).src = user.ppimage;
        document.querySelector(`.editProfile .register-others #usernameInput`).value = user.username;
    }
  }, [user]);

  useEffect(()=>{
    if(imagename){
        document.getElementById('uploadedImage').src = imagename;
    }
  },[imagename])



  useEffect(() => {
    document.getElementById('ppimage').addEventListener('change',(e)=>setimage(e.target.files[0]));
    document.querySelector(`.editProfile .register-others #usernameInput`).addEventListener('change',(e)=>setusername(e.target.value));
    return(
        ()=>{
            axios.post(`${enviroment.baseUrlBack}/api/getuser`,{
                token:localStorage.getItem("x-access-token")
            }).then(res=>{
                setuser(res.data.user);
            }).catch(err=>{
                document.querySelector('.messages').classList.remove('d-none');
                document.querySelector('.success').innerHTML = "";
                document.querySelector('.loading').innerHTML = "";
                document.querySelector('.errorShow').innerHTML = err;
            });
        }
    )
  }, [])
  const editProfile = () => {
    
    if(username && username.length>0 && imagename){
        document.querySelector('.messages').classList.remove('d-none');
        document.querySelector('.loading').innerHTML = "Please wait..";
        document.querySelector('.errorShow').innerHTML = "";
        document.querySelector('.success').innerHTML = "";

        axios.post(`${enviroment.baseUrlBack}/api/edit_user`,{
            token:localStorage.getItem('x-access-token'),
            username:username,
            imagename:imagename
        }).then(res=>{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.errorShow').innerHTML = "";
            document.querySelector('.success').innerHTML = "User Edited :D";
            window.location = "/account"
        }).catch(err=>{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.success').innerHTML = "";
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.errorShow').innerHTML = "Couldn't edit user now, please try again";
        });

    }
    else{
        document.querySelector('.messages').classList.remove('d-none');
        document.querySelector('.loading').innerHTML = "";
        document.querySelector('.errorShow').innerHTML = "Please fill the fields";
        document.querySelector('.success').innerHTML = "";
    }
  }
  return (
    <div className='editProfile login'>
        <div className='messages d-none'>
            <div className="loading"></div>
            <div className="success"></div>
            <div className="errorShow"></div>
        </div>
        <div className='imageUpload'>
            <div className='imageContainer' ><img alt="ppPreview" src={`${enviroment.baseUrlBack}/uploads/default.png`} id="uploadedImage"/></div>
            <div className='register-others'>
                <div className="input_div"><input type="text" onChange={(e)=>{setusername(e.target.value)}} placeholder="Username" id="usernameInput" name="Username" className="ghost-input" required /></div>
            </div>
            <div className="input_div"><input type="file" id='ppimage' onChange={()=>{imageUpload()}} accept="image/*" name="image" className="myInput" required /></div>
            <div className='register-upload-buttons'>
                <div className="input_div"><button onClick={()=>{window.location="/account"}}  className="btn">Back</button></div>
                <div className="input_div"><input type="submit" onClick={()=>editProfile()} value="Submit" name="submit" className="btn"/></div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile