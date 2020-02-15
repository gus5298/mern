import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AllFilesList from "./components/AllFilesList";
import EditFile from "./components/EditFile";
import AddFiles from "./components/AddFiles";
import Header from "./components/Header";
import About from './components/html/About';
import signin from './components/signin';
import signup from './components/signup';



class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
      
        <Header />
      <Route path="/" exact component={AllFilesList} />
      <Route path="/edit/:id" component={EditFile} />
      <Route path="/create" component ={AddFiles} />
      <Route path="/about" component={About} />
      <Route path="/signin" component={signin} />
      <Route path="/signup" component={signup} />
     
</div>
      </Router>
    )
  }
}

export default App

