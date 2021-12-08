
import { fadeInLeft} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Tasktable from './components/Tasktable'


const Animation = keyframes`${fadeInLeft}`;


const LoginAnimation = styled.div`
  animation: 0.9s ${Animation};
  animation-timing-function: ease-out;
`;


const Hometask = () => {
    return (
        <div class="columns m-2 mb-6">
       
            <div class="column is-full">
            <LoginAnimation>

            <p className="subtitle is-5" style={{ 'color': "grey" }}><i class="fas fa-caret-down" style={{"fontSize" : "20px"}}></i> My tasks</p>
            <hr/>
            <Tasktable/>
            </LoginAnimation>
            </div>
       
        </div>
    )
}


export default Hometask;