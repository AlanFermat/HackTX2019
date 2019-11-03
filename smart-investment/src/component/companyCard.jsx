import React, {
  Component
} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class CompanyCard extends Component {
	constructor(props) {
    	super(props);
    	console.log(this.props.name);
	}
	state = {
		score: 60,
	    dataPie: {
	      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
	      datasets: [
	        {
	          data: [300, 50, 100, 40, 120],
	          backgroundColor: [
	            "#F7464A",
	            "#46BFBD",
	            "#FDB45C",
	            "#949FB1",
	            "#4D5360",
	            "#AC64AD"
	          ],
	          hoverBackgroundColor: [
	            "#FF5A5E",
	            "#5AD3D1",
	            "#FFC870",
	            "#A8B3C5",
	            "#616774",
	            "#DA92DB"
	          ]
	        }
	      ]
	    }
  	}
	render() {
		const Query = "match (c:Company)<-[r:IS_SUPPLIER_FOR]-(n:Supplier) where c.name = '" + this.props.name + "' return n,r,c limit 50";
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
									"environmental influences, social impacts, and governance. We do not recommend investing on this company."
			}
		}
		return (
			<div>
			<Row md="6">
				<Col sm="8" className="text-center"> 
					<h1>{this.props.name}</h1>
				</Col>
				<Col md="4" className="text-center">
					<h1>Score {this.state.score}</h1>
				</Col>
			</Row>
			<Row md="6"> 
				<Col md="8"> 
					<Row md="2">
						<Card body className="text-left"> 
							<CardText> 
								{description}
							</CardText>									
						</Card>
					</Row>
					<Row md="6">
						<Card body style={{height: '49rem'}}>
							<Neo4jGraphRenderer url={process.env.REACT_APP_NEO4J_URI} user={process.env.REACT_APP_NEO4J_USER}
			        password={process.env.REACT_APP_NEO4J_PASSWORD} 
			        query={Query}/>
						</Card>
					</Row>

				</Col>
				<Col md="4"> 
					<Row md="12">
						<Card body style={{ marginTop: '0%', height: '24rem' }}>
				            <Table striped bordered hover size="sm">
							  <thead>
							    <tr>
							      <th>#</th>
							      <th>First Name</th>
							      <th>Last Name</th>
							      <th>Username</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <td>1</td>
							      <td>Mark</td>
							      <td>Otto</td>
							      <td>@mdo</td>
							    </tr>
							    <tr>
							      <td>2</td>
							      <td>Jacob</td>
							      <td>Thornton</td>
							      <td>@fat</td>
							    </tr>
							    <tr>
							      <td>3</td>
							      <td colSpan="2">Larry the Bird</td>
							      <td>@twitter</td>
							    </tr>
							  </tbody>
							</Table>
				        </Card>
					</Row>
					<Row md="12">
						<Card body style={{height: '30rem', marginBottom:'0%'}}>
				          <MDBContainer>
					        <h3 className="mt-5">Pie chart</h3>
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