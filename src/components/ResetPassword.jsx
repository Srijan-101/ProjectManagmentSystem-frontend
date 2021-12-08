import { Link } from 'react-router-dom';
import simg from '../images/login.jpg'
import { useState, useEffect } from 'react'
import MessageDisplay from '../helper/messageDisplay'
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft, fadeInRight, fadeInDown } from 'react-animations';
import { isAuth } from '../helper/helper';

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
    message: '',
    type: '',
    loading: false,
    error: false
}


const ResetPassword = ({ history }) => {
    const [values, setValues] = useState(initialValue);


     

    const {
        email,
        type,
        message,
        error,
        loading,
    } = values

    const onchange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/api/forgotPassword`,
            data: { email }
        })
            .then(response => {
                setValues({
                    ...values,
                    error: true,
                    email: '',
                    type: 'is-primary',
                    message: response.data.message,
                    loading: false,
                })
            })
            .catch(error => {
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
        <>
            <div className="columns mt-6">
                <div className="column is-two-fifths mt-6">
                    <LoginAnimation>
                        <div className="container m-6">
                            <h5 className="title is-6" style={{ 'color': "grey" }}>RECOVER ACCOUNT</h5>
                            <p className="subtitle is-3 mb-2" style={{ 'fontWeight': '500' }}>Forgot your password?</p>
                            <p className="subtitle is-6 " style={{ 'color': "grey" }}>Enter your email address below and we'll get you back on track.</p>
                        </div>
                    </LoginAnimation>
                    <div className="m-6">

                        {error ? <MessageDisplay message={message} type={type} /> : null}
                        <LoginAnimation>
                            <form onSubmit={onSubmit}>
                                <div className="field">
                                    <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Enter your email</p>
                                    <input className="input" value={email} onChange={onchange('email')} type="email" placeholder="Email" style={{ 'height': "50px" }} required />
                                </div>
                                <button type="submit" className="button is-primary mt-5" disabled={loading}>Send reset link</button>
                                <p className="subtitle is-6 mt-5" style={{ 'color': "grey", "fontSize": "14px" }}><Link to="/"> Back to Login</Link></p>
                            </form>
                        </LoginAnimation>
                    </div>
                </div>
                <ImageAnimation>
                    <div className="column mt-4">
                        <img src={simg} alt="desc" />
                    </div>
                </ImageAnimation>
            </div>
        </>
    )
}

export default ResetPassword;