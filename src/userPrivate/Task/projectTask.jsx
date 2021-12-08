import Addtaskmodel from "./Addtaskmodel";
import { useState, useEffect } from "react";
import axios from "axios";

const ProjectTask = ({ email, projectName }) => {
    const [value, setValue] = useState([]);
    const add = () => {
        let a = document.getElementById('taskModal');
        a.classList.add("is-active");
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/api/getTask/${projectName}`,
            params: {
                projectName: projectName
            }
        }).then((res) => {
            setValue(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    let count = 0;
    return (
        <>
            <Addtaskmodel email={email} projectName={projectName} />
   
            <div className="columns">
                <div className="column is-two-fifths ">
                    <div className="container ml-6">
                        <h5 className="title is-6" style={{ 'color': "grey" }}>Project Tasks</h5>
                        <button class="button is-small is-primary" onClick={add}>Add task</button>
                    </div>

                </div>
            </div>
        {value.length !== 0 ? 
            <div class="columns ml-6 mt-5 mb-6">
                <div class="cloumn is-half">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Task Title</th>
                                <th>Assigned to</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Status</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                value.map((ele,key)=> {
                                    console.log(ele);
                                    
                                    let deadline  = new Date(ele.date)
                                    count++;
                                    return (
                                        <tr key={key}>
                                            <td>{count}</td>
                                            <td>{ele.title}</td>
                                            <td>{ele.assignto}</td>
                                            <td>{ele.priority}</td>
                                            <td>{deadline.toLocaleDateString()}</td>
                                            <td>{ele.status}</td>
                            
                   
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
               : <p className="subtitle is-6 ml-6" style={{ 'color': "grey" }}>No task available</p>    }
        </>
    )
}

export default ProjectTask;