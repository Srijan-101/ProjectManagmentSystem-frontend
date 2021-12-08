
import eimg from '../images/email.jpg'
import { fadeInLeft, fadeInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { isAuth, signOut } from '../helper/helper';

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
  token: '',
  message: '',
  name: '',
  type: '',
  loading: false,
  error: false
}


const Activation = ({ history, match }) => {
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    let token = match.params.token;

    if (token) {
      const { fullname } = jwt.decode(token);
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/api/accountActivation`,
        data: { token }
      })
        .then(response => {
          setValues({
            ...values,
            message: response.data.message,
            loading: false,
            name: fullname
          })
          setTimeout(function () { 
            signOut();
            history.push('/') 
          }, 3000);
        })

        .catch(error => {
          setValues({
            ...values,
            message: error.response.data.error,
            loading: false,
            name: fullname
          })
          setTimeout(function () { history.push('/') }, 3000);
        })
    }
  }, [])

  const {
    name,
    message
  } = values;


  return (
    <div class="container" style={center}>
      <div class="columns">

        <div class="column is-three-fifths mt-5">
          <LoginAnimation>
            <p className="subtitle is-4 mb-2" style={{ 'fontWeight': '500' }}>Welcome {name},</p>
            <p className="subtitle is-6 " style={{ 'color': "grey" }}>{message}</p>
          </LoginAnimation>
        </div>


        <div className="column is-two-thirds">
          <ImageAnimation>
            <img src={eimg} alt="desc" />
          </ImageAnimation>
        </div>

      </div>
    </div>
  )
}

export default Activation;