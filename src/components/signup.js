import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export class signup extends Component {

    constructor(props) {
        super(props);

        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword= this.onChangepassword.bind(this);
        

        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
           
            emailsignup: '',
            passwordsignup: ''
           
        }
    }
  onChangeemail(e) {
        this.setState({
            emailsignup: e.target.value

        })
    }
     onChangepassword(e) {
        this.setState({
            passwordsignup: e.target.value

        })
    }
     
    

    onSubmit(e) {

        e.preventDefault();

      
        console.log(`Email: ${this.state.emailsignup}`);
        console.log(`Password: ${this.state.passwordsignup}`);
       


        this.setState({
          
            emailsignup: '',
            passwordsignup: ''
           


        })

        const newFile = {
           
            email: this.state.emailsignup ,
            password: this.state.passwordsignup
                   
        }

        axios.post('http://localhost:5000/user/user/create', newFile).then(res => console.log(res.data))
        window.location.href = "http://localhost:3000/signin";

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <h2> Sign Up </h2>
                <form onSubmit={this.onSubmit}>
                    

                        <div className="form-group">
                        <label> Email: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.emailsignup}
                        onChange={this.onChangeemail}
                        />
                        </div>

                        <div className="form-group">
                        <label> Password : </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.passwordsignup}
                        onChange={this.onChangepassword}
                        />
                        </div>

                        
                        <div className="form-group">
                            <input type="submit"
                            value="Add User"
                            className ="btn btn-primary" />
                            </div>


                    </form>
                   
                
            </div>
        )
    }
}

export default signup
