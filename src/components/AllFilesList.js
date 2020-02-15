import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const File = props => (
    <tr>
        <td> {props.file.file_author}</td>
        <td> {props.file.file_name}</td>
        <td> {props.file.file_version}</td>
        <td> {props.file.file_description}</td>
        <td> {props.file.file_date}</td>
        <td> {props.file.file_moderated.toString()}</td>
        <td> <Link to={"/edit/" + props.file._id}  >Edit</Link> </td>
    </tr>    
)

export class AllFilesList extends Component {

constructor(props) {
     super(props);


     this.state ={
         allfiles: []
    }
}
    
  componentDidMount(){

        axios.get ('http://localhost:5000/cloud').then(res => {
            this.setState({allfiles: res.data});
            }).catch((err) => {
                console.log(err);
            })

    }

    filesList(){
        return this.state.allfiles.map((lastFile, index) =>{
            return <File file={lastFile} key={index} />;
        })
    }


    render() {
        return (
            <div className ="container">
                <h2>
                    Files List
                </h2>
                
                     <table className ="table table-striped">
                        <thead>
                        <tr>
                            <th>Author</th>
                            <th>Name</th>
                            <th>Version</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Currently being modified</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.filesList() }
                        </tbody>
                    </table>
                
            </div>
        )
    }
}

export default AllFilesList