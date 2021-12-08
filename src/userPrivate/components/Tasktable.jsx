import { useState, useEffect } from "react";
import axios from "axios";
import { isAuth } from '../../helper/helper';



const Tasktable = () => {
    const [value, setValue] = useState([]);
    const [status,setStatus] = useState({priority : ''});
    let statuss = status.priority;

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/api/getTaskbyemail/${isAuth().email}`,
            params: {
                email: isAuth().email
            }
        }).then((res) => {
            setValue(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [status])
        
    let email = isAuth().email;
    onchange = name => event => {
        setStatus({[name.name]: event.target.value })
        let title = name.title;
        axios({
            method:'PUT',
            url : `${process.env.REACT_APP_API}/api/updateStatus`,
            data : {title,email,statuss}
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

 
    let count = 0;
    return (
        <>
            {value.length !== 0 ?
                <table class="table">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Task Title</th>
                            <th>Project Name</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            value.map((ele, key) => {

                                let deadline = new Date(ele.date)
                                count++;
                                return (
                                    <tr key={key}>
                                        <td>{count}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.projectname}</td>
                                        <td>{deadline.toLocaleDateString()}</td>
                                        <td>{ele.priority}</td>
                                        <td>
                                            <div className="select" onChange={onchange({name :'priority',title: `${ele.title}`})}>
                                                <select value={ele.status}>
                                                    <option value="Not started">Not started</option>
                                                    <option value="On going">On going</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                : <p className="subtitle is-6" style={{ 'color': "grey" }}>No task available</p>}
        </>
    )
}

export default Tasktable;