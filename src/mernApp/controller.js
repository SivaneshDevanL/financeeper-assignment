import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './home/home'
import Dashboard from './dashboard/dashboard';
import Sign from './signup/sign';

export default function App(){    
    return(
        <Router>
            <Switch>
            <Route exact path='/' render={()=><Home />}/> 
            <Route exact path='/dashboard' render={()=><Dashboard />}/>
            <Route exact path='/sign' render={()=><Sign/>}/>
            </Switch>
        </Router>
    )
}