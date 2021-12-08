import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helper/helper';

const PrivateRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
    
        <Route {...rest} render={props => (

            isAuth() ? 
                <Component {...props} />
            : <Redirect to="/"/>
        )} />
    );
};

export default PrivateRoute;