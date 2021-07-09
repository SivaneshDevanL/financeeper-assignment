import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './dashboard.css'

export default function Dashboard(){
    const [state,setState]=useState()
    const history=useHistory();
    useEffect(()=>{
        fetch("http://localhost:3001")
        .then(x=>x.json())
        .then(setState)
    },[])
    function file(e){
        //  console.log(typeof e.target.files[0]);
        fetch("http://localhost:3001/add",{
            headers:{'content-type':'application/json'},
            method:'post',
            body:e.target.files[0]
        })
        fetch("http://localhost:3001")
        .then(x=>x.json())
        .then(setState)
    }
    return(
        <div id='dash'>
        <div className='flex'>
        <input id='input' type='file' accept=".json,application/json" onChange={file}/>
        <button onClick={()=>history.push('/')}>log out</button></div>
        {state&&state.files.map((item,i)=>(
            <>   
            <h4>{item.title}</h4>
            <p>{item.body}</p>
            </>
        ))}
        </div>
    )
}