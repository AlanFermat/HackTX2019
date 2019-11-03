import React, {
  Component
} from 'react';
import { Card, CardText, Row, Col, Table } from 'reactstrap';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class CompanyCard extends Component {
	constructor(props) {
    	super(props);
    	console.log(this.props.name);
    	this.state = {
			score: 60,
			companyInfo: {
			    _id: "5dbe989bcd94ac4b4ff5b5c4",
			    name: "Apple",
			    revenue:100,
			    profit: 100,
			    assets: 100,
			    market_value:1000,
			    employees: 2000,
			    positive_tweets: 33,
			    negative_tweets: 33,
			    neutral_tweets: 33
			}  
  		}	
	}



	getCompany(callback){
		var data = JSON.stringify({
			"name": this.props.name
		  });

		  console.log(data);

		  var xhr = new XMLHttpRequest();
		  //xhr.withCredentials = true;
		  // const companyInfo = {};
		  xhr.callback = callback;
		  xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
			  let companyInfo = this.responseText;
			  console.log(companyInfo);
			  callback(this.responseText);
			}
		  });
		  
		  xhr.open("POST", "http://localhost:3001/company");
		  xhr.setRequestHeader("Content-Type", "application/json");
		  xhr.setRequestHeader("Accept", "*/*");
		  xhr.setRequestHeader("Cache-Control", "no-cache");
		  xhr.setRequestHeader("cache-control", "no-cache");
		  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		  // xhr.timeout = 4000;
		  xhr.send(data);
		  // return xhr.responseText;
		  // console.log(xhr.response.body);
	}

	render() {

		// this.setState({
		//   	companyInfo: this.getCompany()
		//   });
		const dataPie = {
	      labels: ["Positive", "Negative", "Neutral"],
	      datasets: [
	        {
	          data: [this.state.companyInfo.positive_tweets, 
	          this.state.companyInfo.negative_tweets, 
	          this.state.companyInfo.neutral_tweets],
	          backgroundColor: [
	            "#F7464A",
	            "#46BFBD",
	            "#FDB45C"
	          ],
	          hoverBackgroundColor: [
	            "#FF5A5E",
	            "#5AD3D1",
	            "#FFC870"
	          ]
	        }
	      ]
	    };
	    this.getCompany((responseText) => {
    		var json = JSON.parse(responseText);
			this.setState({
				companyInfo: json
			});
			this.setState({
				score: Math.round(this.state.companyInfo.profit * 100 / this.state.companyInfo.employees + this.state.companyInfo.positive_tweets)
			});
		});

		const Query = "match (c:Company)<-[r:IS_SUPPLIER_FOR]-(n:Supplier) where c.name = '" + this.props.name + "' return n,r,c limit 40";
		let description;
		// console.log(this.state.companyInfo.profit / this.state.companyInfo.employees);

		// let num = JSON.parse(this.state.companyInfo.profit) / JSON.parse(this.state.companyInfo.employees);
		// console.log(num);
		// this.setState({
		// 	score: num
		// })
		if (this.state.score >= 80) {
			description = this.props.name+" Inc. is a company that shows a high score on the overall evaluation of " + 
					"environmental influences, social impacts, and governance. We highly recommend investing on this company."
		} else {
			if (this.state.score > 60 && this.state.score < 80) {
				description = this.props.name+" Inc. is a company that shows a mediocre score on the overall evaluation of " +
									"environmental influences, social impacts, and governance. We would not say investing this company is a good idea but we " + 
									"are also not against it."
			} else {
				description = this.props.name+" Inc. is a company that shows a low score on the overall evaluation of " +
									"environmental influences, social impacts, and governance. We do not recommend investing in this company."
			}
		}
		// console.log("render");
		// console.log(this.state.companyInfo);
		// console.log(this.state.companyInfo.revenue);
		return (
			<div>
			<Row md="6">
				<Col sm="7" className="text-center"> 
					<h1>{this.props.name}</h1>
				</Col>
				<Col md="5" className="text-center">
					<h1>Score: {this.state.score}</h1>
				</Col>
			</Row>
			<Row md="6"> 
				<Col md="7"> 
					<Row md="2">
						<Card body className="text-left" style={{backgroundColor: '#f5f5f5', paddingLeft: "3rem"}}> 
							<CardText> 
								{description}
							</CardText>									
						</Card>
					</Row>
					<Row md="6">
						<Card body style={{height: '45rem', backgroundColor: '#f5f5f5', paddingLeft:"3rem" }}>
							<Neo4jGraphRenderer url={process.env.REACT_APP_NEO4J_URI} user={process.env.REACT_APP_NEO4J_USER}
			        password={process.env.REACT_APP_NEO4J_PASSWORD} 
			        query={Query}/>
						</Card>
					</Row>
				</Col>
				<Col md="5"> 
					<Row md="12">
						<Card body style={{ marginTop: '0%', height: '24rem',backgroundColor: '#f5f5f5',paddingRight:"3rem" }}>
				            <h2>Financial Data</h2>
				            <Table striped bordered hover size="sm">
							  <thead>
							    <tr>
							      <th>Properties</th>
							      <th>Amount</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <td>Revenues($M)</td>
							      <td id="revenue">{this.state.companyInfo.revenue}</td>
							    </tr>
							    <tr>
							      <td>Profits($M)</td>
							      <td id="profit">{this.state.companyInfo.profit}</td>
							    </tr>
							    <tr>
							      <td>Assets($M)</td>
							      <td id="assets">{this.state.companyInfo.assets}</td>
							    </tr>
							    <tr>
							    	<td>Market Value($M)</td>
							    	<td id="market_value">{this.state.companyInfo.market_value}</td>
							    </tr>
							    <tr>
							    	<td>Employees</td>
							    	<td id="employees">{this.state.companyInfo.employees}</td>
							    </tr>
							  </tbody>
							</Table>
				        </Card>
					</Row>
					<Row md="12">
						<Card body style={{height: '27rem', backgroundColor: '#f5f5f5'}}>
				          <MDBContainer id="pie">
					        <h2 className="mt-2">Public Sentiment</h2>
					        <Pie data={dataPie} options={{ responsive: true }}/>
					      </MDBContainer>
				        </Card>
					</Row>
				</Col>
			</Row>
			</div>
			
		);
	}



}

export default CompanyCard;