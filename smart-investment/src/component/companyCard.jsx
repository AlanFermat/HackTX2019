import React, {
  Component
} from 'react';
import { Card, CardText, Row, Col, Table } from 'reactstrap';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";

class CompanyCard extends Component {
	constructor(props) {
    	super(props);
    	console.log(this.props.name);
	}

	state = {
		score: 60,
	    dataPie: {
	      labels: ["Positive", "Negative", "Neutral"],
	      datasets: [
	        {
	          data: [30, 30, 30],
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
	    }
  	}
	render() {
		const Query = "match (c:Company)<-[r:IS_SUPPLIER_FOR]-(n:Supplier) where c.name = '" + this.props.name + "' return n,r,c limit 40";
		let description;
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
						<Card body style={{ marginTop: '0%', height: '20rem',backgroundColor: '#f5f5f5',paddingRight:"3rem" }}>
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
							      <td>10000</td>
							    </tr>
							    <tr>
							      <td>Profits($M)</td>
							      <td>10000</td>
							    </tr>
							    <tr>
							      <td>Assets($M)</td>
							      <td>10000</td>
							    </tr>
							    <tr>
							    	<td>Market Value($M)</td>
							    	<td>100</td>
							    </tr>
							    <tr>
							    	<td>Employees</td>
							    	<td>2133</td>
							    </tr>
							  </tbody>
							</Table>
				        </Card>
					</Row>
					<Row md="12">
						<Card body style={{height: '27rem', backgroundColor: '#f5f5f5'}}>
				          <MDBContainer>
					        <h2 className="mt-2">Pie chart</h2>
					        <Pie data={this.state.dataPie} options={{ responsive: true }} />
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