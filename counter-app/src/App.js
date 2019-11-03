import React, { Component } from "react";
import "./App.css";
import CompanyInfo from "./component/companyInfo";
import CompanyCard from "./component/companyCard";

class App extends Component{
    constructor(props) {
    super(props);
    this.state = {value: '', companyName:''}
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserInput(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      companyName: this.state.value
    });
    
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
      { this.state.companyName === '' 
        ? <CompanyInfo /> 
        : <CompanyCard name={this.state.companyName}/>
      }
      
      </div> 
    );
  }
}

export default App;
