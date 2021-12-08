
import limg from '../images/login.jpg'
import { Link ,Redirect} from 'react-router-dom'
import { useState} from 'react'
import MessageDisplay from '../helper/messageDisplay'
import axios from 'axios'
import styled, { keyframes } from 'styled-components';
import { fadeInLeft, fadeInRight } from 'react-animations';
import { authenticate, isAuth } from '../helper/helper';
import Home from '../userPrivate/Home'


const Animation = keyframes`${fadeInLeft}`;

const LoginAnimation = styled.div`
  animation: 0.9s ${Animation};
  animation-timing-function: ease-out;
`;

const Animations = keyframes`${fadeInRight}`;

const ImageAnimation = styled.div`
  animation: 0.9s ${Animations};
  animation-timing-function: ease-out;
`;




let initialValue = {
    email: '',
    password: '',
    message: '',
    type: '',
    loading: false,
    error: false
}



const Login = ({history}) => {
    const [values, setValues] = useState(initialValue);

    const {
        email,
        type,
        password,
        message,
        error,
        loading,
    } = values
    
    const onchange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    
    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values,loading: true })

            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API}/api/Login`,
                data: {email, password }
            })
             
                .then(response => {
                    authenticate(response, () => {
                        setValues({
                            ...values,
                            error: false,
                            email: '',
                            password: '',
                            type: 'is-primary',
                            message: response.data.message,
                            loading: false,
                        })
                    })
                    isAuth() ? history.push('/home'): <Redirect to = '/'/>
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                    setValues({
                        ...values,
                        error: true,
                        type: 'is-danger',
                        message: error.response.data.error,
                        loading: false,
                    })
                })
    }

    return (
        <div className="columns mt-6">
        
            <div className="column is-two-fifths ">
            <LoginAnimation>
                <div className="container m-6">
                    <h5 className="title is-6" style={{ 'color': "grey" }}>LOGIN</h5>
                    <p className="subtitle is-3 mb-2" style={{ 'fontWeight': '500' }}>Welcome back</p>
                    <p className="subtitle is-6 " style={{ 'color': "grey" }}>Login to manage your account.</p>
                </div>
            </LoginAnimation>
            <LoginAnimation>
            <form onSubmit={onSubmit}>
                <div className="m-6">
            
         
                {error ? <MessageDisplay message={message} type={type} /> : null}
           
                    <div class="field">
                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Enter your email</p>
                        <input className="input" onChange={onchange('email')} value={email} type="email" placeholder="Email" style={{ 'height': "50px" }} required/>
                    </div>
                    <div className="field mt-5">
                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px", "float": "left" }} required>Enter your password</p>
                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px", "float": "right" }}><Link to="/reset">
                            Forgot your password?</Link></p>
                        <input className="input" type="password" onChange={onchange('password')} value={password} placeholder="Password" style={{ 'height': "50px" }} />
                    </div>
                    <button className="button is-primary mt-5" type="submit" disabled={loading}>Login</button>
                    <p className="subtitle is-6 mt-5" style={{ 'color': "grey", "fontSize": "14px" }}>Don't have an account yet? <Link to="/Signup">Sign up here.</Link></p>
                </div>
             </form>
             </LoginAnimation>
             
            </div>
       
    <ImageAnimation>
            <div className="column mt-6">
                <img src={limg} alt="desc"/>
            </div>
    </ImageAnimation>
        </div>

    )
}

export default Login;