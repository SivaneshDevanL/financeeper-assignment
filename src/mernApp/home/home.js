import React from 'react';
import './home.css'
import {useHistory} from 'react-router';

var username,password;
export default function Home(){
    const history=useHistory();
    function change(e){username=e.target;}
    function change1(e){password=e.target;}
    function login(){
        if(username===undefined||password===undefined) return
        fetch('http://localhost:3001/login',{
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify({
                userName:username.value,
                password:password.value
            })
            }).then(x=>x.json()).then(y=>{
            if(y.authToken){
                fetch('http://localhost:3001/secure-posts',{
                    headers:{Authorization:'Bearer '+y.authToken}
                })
                .then(a=>a.json())
                .then(b=>{
                    if(b.message==='success') history.push('/dashboard')
                })
            }
        })
    }
    return(
        <div id='main'>
        <h2>MERN App</h2>
        <input placeholder='username' onChange={change}/>
        <input placeholder='password' type='password' onChange={change1}/>
        <div id='flex'>
        <h5 onClick={login}>login</h5>
        <h5 onClick={()=>history.push('/sign')}>signup</h5></div>
        </div>
    )
}