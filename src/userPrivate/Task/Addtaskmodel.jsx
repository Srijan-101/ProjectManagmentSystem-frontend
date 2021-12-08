import {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

const intitalValue = {
    title : '',
    description : '',
    assignTo : '',
    priority: 'Low',
    date : '',
    status : 'Not started'
}


const Addtaskmodel = ({ email,projectName}) => {
    const [value,setValue] = useState(intitalValue)
    const [sDate,setDate] = useState(new Date());
    
    const onchange = name => (event) => {
        setValue({ ...value, [name]: event.target.value })
    }
    
     
    const {title,description,assignTo,priority,status} = value;
    const onSubmit = (e) => {
        e.preventDefault();
        axios({
            method : 'POST',
            url : `${process.env.REACT_APP_API}/api/addTask`,
            data : {title,description,assignTo,priority,sDate,projectName,status}
        }).then(response => {

            setValue(intitalValue);
            let a = document.getElementById('taskModal');
            a.classList.remove("is-active");
            window.location.reload();

        }).catch(error => console.log(error));
    }

    return (
        
        <div class="modal" id="taskModal">
            <div class="modal-background"></div>
            <div class="modal-card">
            <form onSubmit={onSubmit}>
                <header class="modal-card-head">
                    <p class="modal-card-title">Add task</p>
                </header>
                <section class="modal-card-body">
                    
                        <div class="field">
                            <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Task title</p>
                            <input className="input" type="text" onChange={onchange('title')} placeholder="Title" style={{ 'height': "50px" }} required />
                        </div>
                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Project description</p>
                        <textarea id="textarea" onChange={onchange('description')}  className="textarea mb-4" placeholder="e.g. Hello world"></textarea>
                       
                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Deadline</p>
                        <DatePicker className="mb-4" selected={sDate} onChange={(date) => setDate(date)} />

                        <p className="subtitle is-6 mb-3" style={{ 'color': "grey", "fontSize": "14px" }}>Assign to</p>
                        <div class="select">
                            <select onChange={onchange('assignTo')} >
                                <option>Select user</option>
                                {email.map(ele => {
                                    return (
                                        <option value={ele.Useremail}>{ele.Useremail}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <p className="subtitle is-6 mb-3 mt-4" style={{ 'color': "grey", "fontSize": "14px" }}>Priority</p>
                        <div class="control">
                            <label class="radio">
                                <input onChange={onchange('priority')} value='Low'  type="radio" name="rsvp" className="mr-2" defaultChecked />
                                Low
                            </label>
                            <label class="radio">
                                <input onChange={onchange('priority')}  value='Medium' type="radio" name="rsvp" className="mr-2" />
                                Medium
                            </label>
                            <label class="radio">
                                <input onChange={onchange('priority')}   value='Urgent'  type="radio" name="rsvp" className="mr-2" />
                                Urgent
                            </label>
                        </div>
                </section>
                
                <footer class="modal-card-foot">
                    <button class="button is-primary" type="submit">Add task</button>
                   
                    <button class="button" onClick={() => {
                        let a = document.getElementById('taskModal');
                        a.classList.remove('is-active');
                    }}>Cancel</button>
                </footer>
                </form>
            </div>
        </div>
    )
}

export default Addtaskmodel;