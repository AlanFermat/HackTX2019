import React, { Component } from "react";
import "./App.css";
import CompanyInfo from "./component/companyInfo";
import CompanyCard from "./component/companyCard";
import { Jumbotron, Input, Form, Navbar, NavItem, NavLink, NavbarBrand, NavbarToggler, Nav} from 'reactstrap';
import background from "./images/background.jpeg";

class App extends Component{
    constructor(props) {
    super(props);
    this.state = {value: '', companyName:''}
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserInput(event) {
    {/*User Input for company query*/}
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    {/*Server side query term*/}
    event.preventDefault();
    this.setState({
      companyName: this.state.value
    });
    
  }
  
  render() {
      const imageUrl = background;
      return (
        <div id = 'root' >
      <header>
      <div>
      <Jumbotron>
        {/*This is the large header at the top of the all pages*/} 
        <h1 className="display-3">Moral Investment</h1>
        <p className="lead">Invest in companies with a healthy supply chain. Learn more <a href="https://github.com/AlanFermat/HackTX2019">here</a>. </p>
        <hr className="my-2" />
        <p>HackTX 2019</p>
        <div className="lead">
        <Navbar expand="md col-4" style={{backgroundColor:'#d3d3d3', width:"35rem"}}>
          <Nav>
            <NavItem>
              <NavLink href="#">Home</NavLink>
            </NavItem>
            <NavItem style={{marginLeft:'5rem'}}>
              <NavLink href="#">Labor Info</NavLink>
            </NavItem>
            <NavItem style={{marginLeft:'5rem'}}>
              <NavLink href="#">Support</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        <Form className = "btn " onSubmit = {this.handleSubmit} style={{marginLeft:'70rem'}}>
            <Input style={{paddingRight:'10rem'}} type = "text" value = {this.state.value} placeholder = "Enter a Company here" onChange = {this.handleUserInput} /> 
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
