import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export class signin extends Component {

    constructor(props) {
        super(props);

        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword= this.onChangepassword.bind(this);
        this.onChange = this.onChange.bind(this)

        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
           
            emailsignin: '',
            passwordsignin: '',
            redirectTo: null
           
        }
    }
  onChangeemail(e) {
        this.setState({
            emailsignin: e.target.value

        })
    }
     onChangepassword(e) {
        this.setState({
            passwordsignin: e.target.value

        })
    }
     
    

    onSubmit(e) {

        e.preventDefault();

      
        console.log(`Email: ${this.state.emailsignin}`);
        console.log(`Password: ${this.state.passwordsignin}`);
       


        this.setState({
          
            emailsignin: '',
            passwordsignin: ''
           


        })

        const newFile = {
           
            email: this.state.emailsignin,
            password: this.state.passwordsignin
                   
        }

        axios.post('/user/login', newFile).then(res => {
                console.log('login response: ')
                console.log(res)
                if (res.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        email: res.data.email
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: 'http://localhost:3000/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
        //window.location.href = "http://localhost:3000/";

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <h2> Sign In </h2>
                <form onSubmit={this.onSubmit}>
                    

                        <div className="form-group">
                        <label> Email: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.emailsignin}
                        onChange={this.onChangeemail}
                        />
                        </div>

                        <div className="form-group">
                        <label> Password : </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.passwordsignin}
                        onChange={this.onChangepassword}
                        />
                        </div>

                        
                        <div className="form-group">
                            <input type="submit"
                            value="Log in"
                            className ="btn btn-primary" />
                            </div>


                    </form>
                   
                
            </div>
        )
    }
}

export default signin
