
import NavBar from '../../components/nav'
import {useState,useEffect} from 'react'
import axios from 'axios';
import ProjectTask from '../Task/projectTask';


const ProjectDesc = ({location}) => {
    const [value,setValue] = useState([]);
    useEffect(() => {
        axios({
            method:'GET',
            url : `${process.env.REACT_APP_API}/api/getEmail/${location.state.data.title}`,
            params : {
                title : location.state.data.title
            }
          }).then(response => {
            setValue(response.data);
          })
    },[])
    
    let deadline  = new Date(location.state.data.date)
 
    return (
        <>
            <NavBar />
            <div className="columns mt-4">
                <div className="column is-two-fifths ">
                    <div className="container m-6">
                        <h5 className="title is-6" style={{ 'color': "grey" }}></h5>
                        <p className="subtitle is-3 mb-2" style={{ 'fontWeight': '500' }}>{location.state.data.title}</p>
                        <p className="subtitle is-6 " style={{ 'color': "grey" }}>Created by : {location.state.data.adminemail}</p>
                        
                        <div className="columns is-multiline">
                            

                            {value.map((a,key) => {
                                
                         return (
                            <div className="column is-half" key={key}>
                            <article className="message is-primary ">
                                <div className="message-header">
                                    <p style={{ "fontSize": "14px"}} >{a.Useremail}</p>
                                </div>
                            </article>
                          </div>
                         )
                    })}
  
                        </div>
                        <p className="subtitle is-6 mt-5" style={{ 'color': "grey" }}>Deadline : {deadline.toLocaleDateString()}</p>
                        </div>
                        
                    </div>
                    <div className="column is-half">
                        <div className="card">
                            <div className="card-content">
                                <p className="subtitle is-6 ">Description</p>
                                <div className="content">
                                   {location.state.data.description}
                                </div>
                            </div>
                        </div>
                </div>
                </div>
                <hr/>
                <ProjectTask email={value} projectName={location.state.data.title}/>
            </>
            )
}

            export default ProjectDesc;