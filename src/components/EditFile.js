import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export class EditFile extends Component {

   
constructor(props) {
        super(props);

        this.onChangeFileDescription = this.onChangeFileDescription.bind(this);
        this.onChangeFileName= this.onChangeFileName.bind(this);
        this.onChangeFileAuthor= this.onChangeFileAuthor.bind(this);
        this.onChangeFileDate= this.onChangeFileDate.bind(this);

        this.checkin= this.checkin.bind(this);
        this.checkout= this.checkout.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.delete = this.delete.bind(this);

        this.state ={
            file_author: '',
            file_name: '',
            file_description: '',
            file_version: '',
            file_date: new Date(),
            file_moderated: 'false'
        }

}

  componentDidMount() {

          axios.get('http://localhost:5000/cloud/'+ this.props.match.params.id)
          .then(res => {
            this.setState({
                file_author: res.data.file_author,
                file_author2: res.data.file_author,
                file_name: res.data.file_name,
                file_name2: res.data.file_name,
                file_version: res.data.file_version,
                file_date: res.data.file_date,
                file_date2: res.data.file_date,
                file_description: res.data.file_description,
                file_description2: res.data.file_description});
            }).catch((err) => {
                console.log(err);
            })
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

const obj2 = {
            file_author: this.state.file_author,
            file_name: this.state.file_name,
            file_description: this.state.file_description,
            file_version: this.state.file_version + 1,
            file_moderated: this.state.file_moderated
    };


axios.post('http://localhost:5000/cloud/add', obj2).then(res => console.log(res.data))


 //this.props.history.push('/');
 window.location.href = "http://localhost:3000/";

  }


 delete() {
        axios.delete('http://localhost:5000/cloud/delete/'+ this.props.match.params.id)
         .then((res) => { 
           console.log('File Deleted');
         }).catch((err) => {
        console.log(err)
      });

     this.props.history.push('/');
     window.location.reload();

    }

 checkin() {
     const obj = {
            file_author: this.state.file_author2,
            file_name: this.state.file_name2,
            file_description: this.state.file_description2,
            file_date: this.state.file_date2,
            file_moderated: 'true'
    };

        axios.post('http://localhost:5000/cloud/update/'+ this.props.match.params.id, obj)
        .then(res => console.log(res.data)).catch(function (error) {
              console.log(error);
          })


        

     
    }

    checkout() {
const obj = {
            file_author: this.state.file_author2,
            file_name: this.state.file_name2,
            file_description: this.state.file_description2,
            file_date: this.state.file_date2,
            file_moderated: 'false'
    };

axios.post('http://localhost:5000/cloud/update/'+ this.props.match.params.id, obj)
        .then(res => console.log(res.data)).catch(function (error) {
              console.log(error);
          })


    }


    render() {
        return (
            
            <div className="container">
                <button onClick={this.checkin} className="btn btn-success" aria-pressed="true">Check In</button>
                <button onClick={this.checkout} className="btn btn-success" aria-pressed="true">Check Out</button>

                 <div className="row">
                <div className="col-lg-6">
                    <h2>Old File</h2>
                <form name="form1" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> File Author: </label>
                        <input type="text"
                        className="form-control" 
                        value={this.state.file_author2}
                        onChange={this.onChangeFileAuthor}
                        disabled/>
                        </div>

                        <div className="form-group">
                        <label> File Name: </label>
                        <input type="text"
                        className="form-control" 
                        value={this.state.file_name2}
                        onChange={this.onChangeFileName}
                        disabled/>
                        </div>

                        <div className="form-group">
                        <label> File Description : </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.file_description2}
                        onChange={this.onChangeFileDescription}
                        disabled/>
                        </div>
                        

<button onClick={this.delete} className="btn btn-danger">Delete</button>

                    </form>
                    </div>

                    
                    <div className ="col-lg-6">
                    <form name="form2" onSubmit={this.onSubmit}>
                        <h2>New File</h2>
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

                        <div className="form-group">
                            <input type="submit"
                            value="Update File"
                            className ="btn btn-primary" />
                            </div>


                    </form>
                    </div>
                    </div>

            </div>
        )
    }
}

export default EditFile