import { bounceIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { isAuth } from '../../helper/helper';
import axios from 'axios';
import {useState} from 'react'
import { Redirect } from 'react-router';
import { useHistory } from 'react-router';

import Deleteproject from './Deleteproject';

const Animations = keyframes`${bounceIn}`;


const Hoverr = styled.div`
    animation: 1.2s ${Animations};
    animation-timing-function:ease-in-out;
`;




const Projectcomp = ({id,name,color,adminemail,title,date,desc}) => {
    let history = useHistory();

    const viewProject = () => {
        history.push({
            pathname: `/projectdesc/${title}`,
            state: {data : {
                 title : title,
                 date : date,
                 description : desc,
                 adminemail : adminemail,
                 id : id
            }}
        })
     }

    const onmodal = () => {
        let a = document.getElementById("deleteProject");
        a.classList.add('is-active');
    }

    return (
    <>
    <div class="column is-one-fifth">
    <button style={{"marginRight":"-12%","visibility":"hidden"}}/> 
    {adminemail === isAuth().email ? <button className="delete" id="comp" onClick={onmodal} style={{"marginRight":"-12%"}}/> : null}
    <Hoverr>
        <div class="tile box m-3" style={{"backgroundColor":`${color}`,"cursor":"pointer"}} onClick={viewProject}>
        <div class="container" style={{"paddingTop":"40px","paddingBottom":"40px"}}>
         <center><i class="fas fa-align-center" style={{"color":"white","fontSize":"50px"}}></i></center>
        </div>
        </div>
        <center><p className="subtitle is-6 mb-3 pl-2 pr-2" style={{ 'color': "grey", "fontSize": "14px","fontWeight":"bold"}}>{name}</p></center>
    </Hoverr>
    </div>  
    </>
    )
}

export default Projectcomp;