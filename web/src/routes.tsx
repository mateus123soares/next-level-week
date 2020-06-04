import React from 'react'
import {Route,BrowserRouter} from 'react-router-dom';

import Home from './pages/Home'
import Createpoints from './pages/CreatePoints';

const Routes = () =>{
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Createpoints} path="/create-point"/>
        </BrowserRouter>
    )
}

export default Routes
