import simg from '../images/signup.jpg'
import { Link, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MessageDisplay from '../helper/messageDisplay'
import axios from 'axios'
import { fadeInLeft, fadeInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
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
    fname: '',
    lname: '',
    email: '',
    password: '',
    repassword: '',
    message: '',
    type: 'is-danger',
    submitloading: false,
    error: false
}

const Signup = ({ history }) => {

    const [values, setValues] = useState(initialValue)
    const {
        fname,
        lname,
        email,
        type,
        password,
        repassword,
        message,
        error,
        submitloading,
    } = values

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, submitloading: true })
        let fullname = fname + " " + lname;
        if (password !== repassword) {
            setValues({ ...values, message: 'Please make sure your password match.', error: true })
        } else {
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API}/api/Signup`,
                data: { fullname, email, password }
            })
                .then(response => {
                    setTimeout(function () { history.push('/') }, 3000);
                    setValues({
                        ...values,
                        error: true,
                        fname: '',
                        lname: '',
                        email: '',
                        password: '',
                        repassword: '',
                        type: 'is-primary',
                        message: response.data.message,
                        submitloading: false,
                    })
                })
                .catch(error => {
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
                                SIGNUP
                            </h5>
                            <p className='subtitle is-3 mb-2' style={{ fontWeight: '500' }}>
                                Create an account
                            </p>
                            <p className='subtitle is-6 ' style={{ color: 'grey' }}>
                                Fill out the form to get started.
                            </p>
                        </div>
                    </LoginAnimation>

                    <div className='m-6'>

                        {error ? <MessageDisplay message={message} type={type} /> : null}
                        <LoginAnimation>
                            <form onSubmit={onSubmit}>
                                <div class='columns'>
                                    <div className='column'>
                                        <div className='field'>
                                            <p
                                                className='subtitle is-6 mb-3'
                                                style={{ color: 'grey', fontSize: '14px' }}
                                            >
                                                Enter your first name
                                            </p>
                                            <input
                                                className='input'
                                                onChange={onChange('fname')}
                                                type='text'
                                                value={fname}
                                                placeholder='First name'
                                                style={{ height: '50px' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class='column'>
                                        <p
                                            className='subtitle is-6 mb-3'
                                            style={{ color: 'grey', fontSize: '14px' }}
                                        >
                                            Enter your last name
                                        </p>
                                        <input
                                            className='input'
                                            onChange={onChange('lname')}
                                            type='text'
                                            value={lname}
                                            placeholder='Last name'
                                            style={{ height: '50px' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='field'>
                                    <p
                                        className='subtitle is-6 mb-3'
                                        style={{ color: 'grey', fontSize: '14px' }}
                                    >
                                        Enter your email
                                    </p>
                                    <input
                                        className='input'
                                        onChange={onChange('email')}
                                        type='email'
                                        value={email}
                                        placeholder='Email'
                                        style={{ height: '50px' }}
                                        required
                                    />
                                </div>
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

                            </form>
                        </LoginAnimation>
                        <LoginAnimation>
                            <p
                                className='subtitle is-6 mt-5'
                                style={{ color: 'grey', fontSize: '14px' }}
                            >
                                Already have an account? <Link to='/'>Login here.</Link>
                            </p>
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

export default Signup
