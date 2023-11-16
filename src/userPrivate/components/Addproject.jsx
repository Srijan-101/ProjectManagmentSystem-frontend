import { remove } from 'js-cookie';
import {useEffect, useState} from 'react'
import { isAuth } from '../../helper/helper';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MessageDisplay from '../../helper/messageDisplay'
import Homeproject from '../Homeproject';




const Addproject = ({onremovee}) => {
    const initialValue = {
        title : "",
        workerEmail : [isAuth().email],
        projectDescription : "",
        error : false,
        message : '',
        loading : false,
        type : 'is-danger'
    }

    let today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        document.getElementById('dateInput').min = today;
    },[]);
   
    
    const [value,setValue] = useState(initialValue);
    const [sDate,setDate] = useState(new Date());

    const remove = (email) => {
        let array = []
        value.workerEmail.forEach(a => {
            if(a !== email) array.push(a);
        });
        setValue({...value,workerEmail:array})
    }

    const {title,projectDescription,workerEmail,message,type,error,loading} = value;
    
    const add = (e) => {
        e.preventDefault();
        let email = document.getElementById('worker').value;
        if(email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email !== isAuth().email)){
            if(value.workerEmail.length !== 0){
                value.workerEmail.indexOf(email) === -1 ? setValue({...value,workerEmail:[...value.workerEmail,email]}):console.error();
            }else{
                setValue({...value,workerEmail:[email]}); 
            }
        } 
    }

    const onchange = name => event => {
        setValue({ ...value, [name]: event.target.value })
    }

    const onsubmit = (e) => {

        e.preventDefault();
        const Adminemail = isAuth().email;
        setValue({...value,loading:true})
        axios(({
            method:'POST',
            url : `${process.env.REACT_APP_API}/api/addProject`,
            data : {title,projectDescription,sDate,workerEmail,Adminemail}
        }))
        .then(response => {
            setValue({
                ...value,
                title : '',
                workerEmail : [],
                projectDescription : '',
                error: false,
                loading : false,
            })
            const a = document.getElementsByClassName("modal");
            a[0].classList.remove("is-active");
            window.location.reload();
        })
        .catch(error => {
            setValue({
                ...value,
                error: true,
                type: 'is-danger',
                message: error.response.data.error,
                loading : false,
            })
        });
    }

    


    return (
        
        <div className="modal" id="addProject">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title text is-5">Add new project</p>
                    <button className="delete" aria-label="close" onClick={onremovee}></button>
                </header>
                <form onSubmit={onsubmit}>
                <section className="modal-card-body">
                {error ? <MessageDisplay message={message} type={type} /> : null}

                    <div className="field">
                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Enter project title</p>
                        <input onChange={onchange('title')}  value ={title} className="input" type="text" placeholder="Project title" style={{ 'height': "50px" }} required />
                    </div>
                    <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Project description</p>
                    <textarea  onChange={onchange('projectDescription')}  value = {projectDescription}  id="textarea" className="textarea mb-4" placeholder="e.g. Hello world"></textarea>
                    
                    <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Deadline</p>
                    <DatePicker id="dateInput" className="mb-4" selected={sDate} onChange={(date) => setDate(date)} />
                    
                    <div className="columns is-multiline">
        

                    {value.workerEmail.map((a,key) => {
                         return (
                            <div className="column is-half" key={key}>
                            <article className="message is-primary ">
                                <div className="message-header">
                                    <p style={{ "fontSize": "15px"}} >{a}</p>
                                     {a !== isAuth().email ? <button className="delete" onClick={() => remove(a)}></button> : null} 
                                </div>
                            </article>
                          </div>
                         )
                    })}
                        
                    </div>

                    <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Add worker</p>
            <div class="columns">
                <div class="column is-half">
                   <input className="input" id="worker" type="email" placeholder="Enter email" style={{ 'height': "50px" }}/>
                </div>
                <div class="column is-half">
                  <button className="button is-primary mt-1" onClick={add} >Add</button>
                </div>
            </div>     
                    
                   
                </section>
               
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-primary" disabled={loading}>Add new project</button>
                </footer>
                </form>
           
            </div>
        </div>
   
    )
}

export default Addproject;