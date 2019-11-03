import React, { Component } from "react";
import "./App.css";
import neo4j from "neo4j-driver/lib/browser/neo4j-web";
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class App extends Component{
    constructor(props) {
    super(props);
      this.state = {
      value: ''}
  this.handleUserInput =
  this.handleUserInput.bind(this);
  this.handleSubmit =
      this.handleSubmit.bind(this);
  }
  handleUserInput(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    alert('A company was submitted: ' +
      this.state.value);
    event.preventDefault();
  }
  

  render() {
      return (
        <div id = 'root' >
      <header >
        <div class = "name-to-be-altered">
          <h1 class = "title-name"> Moral Investment </h1> 
        </div>
         
      </header> 
      <div class = "form-submission" >
        <form onSubmit = {this.handleSubmit} >
          <label>
            Enter a Company:
            <input type = "text" value = {this.state.value} onChange = {this.handleUserInput} /> 
          </label> 
          <input type = "submit" value = "Submit"/> 
        </form> 
      </div>
      </div> 
    );
  }
}

export default App;
