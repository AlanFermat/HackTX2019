import React, { Component } from "react";
import "./App.css";
import CompanyInfo from "./component/companyInfo";
import CompanyCard from "./component/companyCard";
import { Jumbotron, Input, Form, } from 'reactstrap';
import background from "./images/background.jpeg";

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
      const imageUrl = background;
      return (
        <div id = 'root' >
      <header >
      <div>
      <Jumbotron>
        <h1 className="display-3">Moral Investment</h1>
        <p className="lead">Invest in companies with a healthy supply chain. Learn more <a href="https://github.com/AlanFermat/HackTX2019">here</a>. </p>
        <hr className="my-2" />
        <p>HackTX 2019</p>
        <div className="lead">
        <br />
        <Form className = "btn  float-right" onSubmit = {this.handleSubmit} >
            <Input type = "text" value = {this.state.value} placeholder = "Enter a Company here" onChange = {this.handleUserInput} /> 
        </Form>
      </div>
      </Jumbotron>
    </div>
      </header> 
      <div style={{backgroundImage: `url(${imageUrl})`}}>
      { this.state.companyName === '' 
        ? <CompanyInfo/> 
        : <CompanyCard name={this.state.companyName}/>
      }
      </div>
      </div> 
    );
  }
}

export default App;
