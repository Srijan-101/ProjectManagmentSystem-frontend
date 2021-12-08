
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from  './components/ResetPassword';
import Reset  from './components/Reset';
import Activate  from './components/Activate';
import Activation  from './components/Activation';
import Home from './userPrivate/Home';
import { isAuth } from './helper/helper';

import PublicRoute from './Publicroutes';
import PrivateRoute from './Privateroutes';
import ProjectDesc from './userPrivate/components/ProjectDesc';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute restricted={true} exact path = "/" component={Login}/>
                <PublicRoute restricted={true} path = "/signup" component={Signup}/>
                <PublicRoute restricted={true} path = "/reset" component={ResetPassword}/>
                <PublicRoute restricted={true} path="/auth/password/reset/:token" component={Reset}/>
                <PublicRoute restricted={false} path="/auth/activate/:token" component={Activation}/>
                
                <PrivateRoute path="/home" component={isAuth() && !isAuth().isVerified ? Activate : Home} />
                <PrivateRoute path="/activate" component={isAuth() && !isAuth().isVerified ? Activate : Home}/>
                <PrivateRoute path="/projectdesc/:title" component={ProjectDesc}/>
            </Switch>
        </Router>
    )
}

export default Routes;