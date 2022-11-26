import React from 'react'
import './register.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import enviroment from '../../config'
const Register = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [image, setimage] = useState();
    const [imagename, setimagename] = useState(false);
    const imageUpload = async ()=>{
        const imageformData = new FormData();
        imageformData.append("image", image);
        imageformData.append("username", username);
        await axios.post(`${enviroment.baseUrlBack}/api/upload_files`,imageformData,{
                headers:{'Content-Type': 'multipart/form-data'}
        }).then(res=>{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.success').innerHTML = "Image uploaded!";
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.errorShow').innerHTML = "";
            document.getElementById('uploadedImage').src = `${enviroment.baseUrlBack}/uploads/${res.data.imagename}`;
            setimagename(res.data.imagename);
        }).catch(err=>{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.success').innerHTML = "";
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.errorShow').innerHTML = "Image couldn't uploaded, please try again";
        });
    }
    const signMeUp = async () => {
            document.querySelector('.loading').innerHTML = "Loading...";
            document.querySelector('.errorShow').innerHTML = "";
            document.querySelector('.success').innerHTML = "";
            document.querySelector('.messages').classList.remove('d-none');


            await axios.post(`${enviroment.baseUrlBack}/api/register`,{
                username:username,
                password:password,
                imagename:imagename
            }).then(async(res) => {
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.success').innerHTML = "Register Successfull, please wait, you will be redirected";
            await axios.post(`${enviroment.baseUrlBack}/api/login`,{
                username:username,
                password:password
            }).then(res => {
                document.querySelector('.loading').innerHTML= "";
                document.querySelector('.errorShow').innerHTML = "";
                document.querySelector('.success').innerHTML = "";
                if(res.data.user && res.data.user.token.length>0){
                    localStorage.setItem('x-access-token',res.data.user.token);
                    window.location = '/';
                }
            }).catch((error) => {
                document.querySelector('.errorShow').innerHTML = (error.response.data.error);
                document.querySelector('.loading').innerHTML = "";
                document.querySelector('.success').innerHTML = "";
            });
            }).catch((error) => {
            document.querySelector('.errorShow').innerHTML = (error.response.data.error);
            document.querySelector('.loading').innerHTML = "";
            document.querySelector('.success').innerHTML = "";
            });
            
    };

    const nextStep = ()=>{
        if(username.length > 0 && password.length>=8){
            document.querySelector('.messages').classList.add('d-none');
            document.querySelector('.imageUpload').classList.remove('d-none');
            document.querySelector('.register-others').classList.add('d-none');
            document.querySelector('.register-text').classList.add('d-none');
        }
        else{
            document.querySelector('.messages').classList.remove('d-none');
            document.querySelector('.errorShow').innerHTML = "Please fill fields correctly!"; 
        }
    }
    const backStep = ()=>{
        document.querySelector('.messages').classList.add('d-none');
        document.querySelector('.register-text').classList.remove('d-none');
        document.querySelector('.imageUpload').classList.add('d-none');
        document.querySelector('.register-others').classList.remove('d-none');
        document.querySelector('#ppimage').value="";
        document.getElementById('uploadedImage').src = `${enviroment.baseUrlBack}/uploads/default.png`;
        setimage(false)

    }
    useEffect(()=>{
        localStorage.setItem("x-access-token","");   
    },[]);

    useEffect(() => {
        document.getElementById('ppimage').addEventListener('change',(e)=>setimage(e.target.files[0]));
    }, [image])

    return (
    <div className="login">

        <h1 className="display-2 register-text">Register</h1>
        <br/>
        <div className='messages d-none'>
            <div className="loading"></div>
            <div className="success"></div>
            <div className="errorShow"></div>
        </div>
        <div className='imageUpload d-none'>
            <h1>Hey <span className='text-danger text-size-25'>{username}</span>, let's make a profile photo!</h1>
            <div className='imageContainer' ><img alt="ppPreview" src="https://postguys.herokuapp.com/uploads/default.png" id="uploadedImage"/></div>
            <div className="input_div"><input type="file" id='ppimage' onChange={()=>{imageUpload()}} accept="image/*" name="image" className="myInput" required /></div>
            <div className='register-upload-buttons'>
                <div className="input_div"><button type="submit" onClick={()=>backStep()} className="btn">Back</button></div>
                <div className="input_div"><input type="submit" onClick={()=>signMeUp()} value="Submit" name="submit" className="btn"/></div>
            </div>
        </div>
        <div className='register-others'>
            <div className="input_div"><input type="text" onChange={(e)=>{setusername(e.target.value)}} placeholder="Username" name="Username" className="myInput" required /></div>
            <div className="input_div"><input type="password" onChange={(e)=>{setpassword(e.target.value)}} id='registerPass' placeholder="Password" name="Password" className="myInput" required /></div>
            <div className="input_div"><button type="submit" onClick={()=>nextStep()} className="btn">Next</button></div>
        </div>
    </div>
  )
}

export default Register;