
import { useEffect,useState} from 'react';
import { bounceIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Addproject from './components/Addproject';
import Projectcomp from './components/Projectcomp'
import { isAuth } from '../helper/helper';
import axios from 'axios';


const Animation = keyframes`${bounceIn}`;


const Hoverr = styled.div`
    animation: 1.2s ${Animation};
    animation-timing-function: ease-out;
`;





const Homeproject = () => {
    const email = isAuth().email;
    const [value,setValue] = useState([]);
    

    useEffect(() => {
          axios({
            method:'GET',
            url : `${process.env.REACT_APP_API}/api/fetchproject/${isAuth().email}`,
            params : {
                email : email
            }
          }).then(response => {
              setValue([...value,response.data]);
          })
    },[])

    const onclick = () => {
        const a = document.getElementById('addProject');
        a.classList.add("is-active");
    }

    const onremovee = () => {
        const a = document.getElementById('addProject');
        a.classList.remove("is-active");
    }


    return (
        <>
            <div class="columns m-2 mb-1">
                <div class="column is-full">
                    <p className="subtitle is-5" style={{ 'color': "grey" }}><i class="fas fa-caret-down" style={{ "fontSize": "20px" }}></i> Recent projects</p>
                    <hr />
                </div>
            </div>

            <div class="columns m-2 is-multiline">

                <div class="column is-one-fifth mt-5">
                    <Hoverr>
                        <div class="tile box m-3" style={{ "border-style": "dotted", "borderColor": "solid grey", "cursor": "pointer","paddingTop":"50px","paddingBottom":"70px"}} onClick={onclick}>
                            <i class="fa fa-plus" style={{ "fontSize": "20px" }}></i> <p className="subtitle is-6" style={{ 'color': "grey", "marginLeft": "10px" }}> Add new project</p>
                        </div>
                    </Hoverr>
                </div>


               {value.map(ele => (
                     ele.map(a => {
                         return (
                            <Projectcomp name={a.title} color={'#C5C6D0'} adminemail={a.Adminemail} title={a.title} id={a.pid} date={a.date} desc={a.description}/>
                         )
                     })
               ))}

            </div>
            <Addproject onremovee={onremovee}/>
        </>

    )
}


export default Homeproject;