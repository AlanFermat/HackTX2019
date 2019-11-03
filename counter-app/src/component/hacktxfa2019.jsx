import React, {
  Component
} from 'react';



class CompanyForm extends React.Component {
  constructor (props) {
    super(props); 
    this.state={
      value: '',
      formErrors: {value: ''
                  }};
    
    this.handleChange =
this.handleChange.bind(this);  
    this.handleSubmit = 
this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A company was submitted: ' + 
this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div id='root'>
       <header>
         <div class="name-to-be-altered">
           <h1 class="title-name">HackTx 2019</h1>
         </div>
       </header>
        <div class="form-submission">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a Company: 
            <input type="text" value=
  {this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      </div>
    
    );
  }    
}
export default CompanyForm;