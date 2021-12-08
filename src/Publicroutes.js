import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helper/helper';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
     
    
    return (
        <Route {...rest} render={props => (
            isAuth() && restricted ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;