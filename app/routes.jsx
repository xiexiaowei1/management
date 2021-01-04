import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Index from "./Index";

const routes = (
    <HashRouter>
        <Switch>
            <Redirect exact from='/' to='/index'/>
            <Route path='/index' exact component={Index}/>

        </Switch>
    </HashRouter>
);


export default routes;
