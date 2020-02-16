import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AllFilesList from "./components/AllFilesList";
import EditFile from "./components/EditFile";
import AddFiles from "./components/AddFiles";
import Header from "./components/Header";
import About from './components/html/About';
import Signin from './components/signin';
import Signup from './components/signup';
import axios from 'axios';



class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          email: response.data.user.email
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        })
      }
    })
  }

  render() {
    
    return (
 

      <Router>


      <div className="App">
   
       <Header /> 
      <Route path="/" exact component={AllFilesList} />
      <Route path="/edit/:id" component={EditFile} />
      <Route path="/create" component ={AddFiles} />
      <Route path="/about" component={About} />
      {/* <Route path="/signin" component={Signin} /> */}
     
      <Route path="/signup" component={Signup} />


      
        {/* Routes to different components */}
       
        <Route
          path="/signin"
          render={() =>
            <Signin
              updateUser={this.updateUser}
            />}
        />


{/* 
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        /> */}

      
     
</div>


      </Router>
    )
  }
}

export default App

