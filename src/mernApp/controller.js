import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './home/home'
import Dashboard from './dashboard/dashboard';
export default function App(){    
    return(
        <Router>
            <Switch>
            <Route exact path='/' render={()=><Home/>}/>
            <Route exact path='/dashboard' render={()=><Dashboard/>}/>
            </Switch>
        </Router>
    )
}