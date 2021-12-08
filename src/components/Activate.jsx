import eimg from '../images/email.jpg'
import { fadeInLeft, fadeInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { isAuth } from '../helper/helper';
import { useEffect, useState } from 'react'
import axios from 'axios';
import MessageDisplay from '../helper/messageDisplay'
import { Redirect } from 'react-router';
import { signOut } from '../helper/helper';
import NavBar from '../components/nav'

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


const center = {
  "position": "absolute",
  "top": "40%",
  "left": "30%",
  "transform": "translate(-30%,-40%)"
}

let initialValue = {
  message: '',
  type: '',
  loading: false,
  error: false
}


const Activate = ({history}) => {
  

  const { email, fullname } = isAuth();
  const [values, setValues] = useState(initialValue);

  const {
    loading,
    message,
    type,
    error
  } = values;

  const onClick = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true })
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/resendVerify`,
      data: { email }
    })
      .then(response => {
        console.log(response.data);
          setValues({
            ...values,
            error: true,
            password: '',
            type: 'is-primary',
            message: response.data.message,
            loading: false,
          })
         setInterval(() => {
             signOut();
             window.location.reload();
         },1000)
      })
      .catch(error => {
        setValues({
          ...values,
          error: true,
          type: 'is-danger',
          message:error.response.data.error,
          loading: false,
        })
      })
  }


  return (
  <>
    <NavBar/>
    <div class="container" style={center}>
      <div class="columns">

        <div class="column is-three-fifths mt-5">
          <LoginAnimation>
            <p className="subtitle is-4 mb-2" style={{ 'fontWeight': '500' }}>Welcome {fullname},</p>
            <p className="subtitle is-6 " style={{ 'color': "grey" }}>Activate your account to move futher.</p>
            <p className="subtitle is-5" style={{ 'color': "grey" }}>We have send an email for verification.Please check your inbox.</p>
            {error ? <MessageDisplay message={message} type={type} /> : null}
            
            <p className="subtitle is-6 mt-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Have't got any mail yet? </p>
            <button className="button is-primary  is-small" onClick={onClick} disabled={loading}>Resend verification link</button>
          </LoginAnimation>

        </div>


        <div className="column is-two-thirds">
          <ImageAnimation>
            <img src={eimg} alt="desc" />
          </ImageAnimation>
        </div>

      </div>
    </div>
  </>
  )
}

export default Activate;