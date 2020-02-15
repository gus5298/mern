import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export class AddFiles extends Component {

    constructor(props) {
        super(props);

        this.onChangeFileDescription = this.onChangeFileDescription.bind(this);
        this.onChangeFileName= this.onChangeFileName.bind(this);
        this.onChangeFileAuthor= this.onChangeFileAuthor.bind(this);
        this.onChangeFileDate= this.onChangeFileDate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            file_author: '',
            file_name: '',
            file_description: '',
            file_date: new Date(),
            file_version: 0,
            file_moderated: false
        }
    }
  onChangeFileName(e) {
        this.setState({
            file_name: e.target.value

        })
    }
     onChangeFileDescription(e) {
        this.setState({
            file_description: e.target.value

        })
    }
     onChangeFileAuthor(e) {
        this.setState({
            file_author: e.target.value

        })
    }
     onChangeFileDate(e) {
        this.setState({
            file_date: e.target.value

        })
    }
    

    onSubmit(e) {

        e.preventDefault();

        console.log('Form Submitted:');
        console.log(`File Author: ${this.state.file_author}`);
        console.log(`File Name: ${this.state.file_name}`);
        console.log(`File Description: ${this.state.file_description}`);
        console.log(`File Date: ${this.state.file_date}`);


        this.setState({
            file_author: '',
            file_name: '',
            file_description: '',
            file_date: new Date(),
            file_version: 0,
            file_moderated: false


        })

        const newFile = {
            file_author: this.state.file_author,
            file_name: this.state.file_name,
            file_description: this.state.file_description,
            file_date: this.state.file_date,
            file_moderated: this.state.file_moderated,
            file_version: 1
        }

        axios.post('http://localhost:5000/cloud/add', newFile).then(res => console.log(res.data))
        window.location.href = "http://localhost:3000/";

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <h2> Add A New File </h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> File Author: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.file_author}
                        onChange={this.onChangeFileAuthor}
                        />
                        </div>

                        <div className="form-group">
                        <label> File Name: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.file_name}
                        onChange={this.onChangeFileName}
                        />
                        </div>

                        <div className="form-group">
                        <label> File Description : </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.file_description}
                        onChange={this.onChangeFileDescription}
                        />
                        </div>

                        {/* <div className="form-group">
                        <label> File Date: </label>
                        <input type="date"
                        className="form-control"
                        value={this.state.file_date}
                        onChange={this.onChangeFileDate}
                        />
                        </div> */}
                        <div className="form-group">
                            <input type="submit"
                            value="Add File"
                            className ="btn btn-primary" />
                            </div>


                    </form>
                   
                
            </div>
        )
    }
}

export default AddFiles
