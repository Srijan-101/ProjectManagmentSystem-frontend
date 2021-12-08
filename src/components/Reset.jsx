import simg from '../images/signup.jpg'
import { useState ,useEffect} from 'react'
import MessageDisplay from '../helper/messageDisplay'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Link} from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { fadeInLeft, fadeInRight ,fadeInDown} from 'react-animations';
import {isAuth } from '../helper/helper';

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
    fullname :'',
    password: '',
    repassword: '',
    token:'',
    message: '',
    type: 'is-danger',
    submitloading: false,
    error: false
}

const Reset = ({history,match}) => {
    const [values, setValues] = useState(initialValue)
    const {
        fullname,
        type,
        email,
        token,
        password,
        repassword,
        message,
        error,
        submitloading,
    } = values

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    useEffect(() => {
        let token = match.params.token;
        const { email,fullname } = jwt.decode(token);
        setValues({...values,fullname : fullname,email:email,token:token})
    },[])


    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, submitloading: true })
        if (password !== repassword) {
            setValues({ ...values, message: 'Please make sure your password match.', error: true })
        } else {
            axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_API}/api/Resetpassword`,
                data: {email,resetPasswordlink:token,newPassword:password}
            })
                .then(response => {
                    setTimeout(function(){history.push('/')}, 3000);
                    setValues({
                        ...values,
                        error: true,
                        password: '',
                        repassword: '',
                        type: 'is-primary',
                        message: response.data.message,
                        submitloading: false,
                    })
                })
                .catch(error => {
                    console.log(error.response);
                    setValues({
                        ...values,
                        error: true,
                        type: 'is-danger',
                        message: error.response.data.error,
                        submitloading: false,
                    })
                })
        }
    }

    return (
        <>
            <div className='columns mt-2'>

                <div className='column is-two-fifths'>
                <LoginAnimation>
                    <div className='container m-6'>
                        <h5 className='title is-6' style={{ color: 'grey' }}>
                            RESET PASSWORD
                        </h5>
                        <p className='subtitle is-6 mt-2' style={{ color: 'grey' }}>
                          <span class="title is-4">{email}</span>,Enter your new password and manage your account.
                        </p>
    
                    </div>
                </LoginAnimation>

                    <div className='m-6'>

                        {error ? <MessageDisplay message={message} type={type} /> : null}
                <LoginAnimation>
                        <form onSubmit={onSubmit}>
                            <div className='field mt-5'>
                                <p
                                    className='subtitle is-6 mb-3'
                                    style={{ color: 'grey', fontSize: '14px', float: 'left' }}
                                >
                                    New password
                                </p>
                                <input
                                    className='input'
                                    onChange={onChange('password')}
                                    type='password'
                                    value={password}
                                    placeholder='Password'
                                    style={{ height: '50px' }}
                                    required
                                />
                            </div>
                            <div className='field mt-5'>
                                <p
                                    className='subtitle is-6 mb-3'
                                    style={{ color: 'grey', fontSize: '14px', float: 'left' }}
                                >
                                    Reenter password
                                </p>
                                <input
                                    className='input'
                                    onChange={onChange('repassword')}
                                    type='password'
                                    value={repassword}
                                    placeholder='Reenter password'
                                    style={{ height: '50px' }}
                                    required
                                />
                            </div>

                            <button type='submit' className='button is-primary mt-5' disabled={submitloading}>
                                {!submitloading ? "submit" : "Submitting"}
                            </button>
                            <p
                            className='subtitle is-6 mt-5'
                            style={{ color: 'grey', fontSize: '14px' }}
                        >
                            Remembered your password? <Link to='/'>Login here.</Link>
                        </p>
                        </form>
                    </LoginAnimation>
                    </div>
                </div>

            <ImageAnimation>
                <div className='column mt-6'>
                    <img
                        src={simg}
                        alt='desc'
                        className='mt-6'
                        style={{ padding: '6%' }}
                    />
                </div>
            </ImageAnimation>   
            </div>
        </>
    )
}

export default Reset;
