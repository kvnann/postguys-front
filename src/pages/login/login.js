import React from 'react'
import './login.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const logMeIn = async () => {
            document.querySelector('.loading').innerHTML = "Loading...";
            document.querySelector('.errorShow').innerHTML = "";
            document.querySelector('.success').innerHTML = "";
            document.querySelector('.messages').classList.remove('d-none');
            await axios.post("https://postguys.herokuapp.com/api/login",{
                username:username,
                password:password
            }).then(res => {
                document.querySelector('.loading').innerHTML= "";
                document.querySelector('.errorShow').innerHTML = "";
                document.querySelector('.success').innerHTML = "Successful login!";
                if(res.data.user && res.data.user.token.length>0){
                    localStorage.setItem('x-access-token',res.data.user.token);
                    window.location = '/'
                }
            }).catch((error) => {
                document.querySelector('.errorShow').innerHTML = (error.response.data.error);
                document.querySelector('.loading').innerHTML = "";
                document.querySelector('.success').innerHTML = "";
            });

    };

    
    useEffect(()=>{
        localStorage.setItem("x-access-token","");   
    });

    return (
    <div className="login">
        <h1 className='display-2'>Log In</h1>
        <br/>
        <div className='messages d-none'>
            <div className="success"></div>
            <div className="loading"></div>
            <div className="errorShow"></div>
        </div>
        <div className="input_div"><input type="text" onChange={(e)=>{setusername(e.target.value)}} placeholder="Username" name="Username" className="myInput" required /></div>
        <div className="input_div"><input type="password" onChange={(e)=>{setpassword(e.target.value)}} id='loginPass' placeholder="Password" name="Password" className="myInput" required /></div>
        <div className="input_div"><input type="submit" onClick={logMeIn} value="Submit" name="submit" className="btn-black-edition border-black" /></div>
        <br/>
        <div className="">Don't have an account? <a className="muted" href="./register">Create one!</a></div>
    </div>
  )
}

export default Login;