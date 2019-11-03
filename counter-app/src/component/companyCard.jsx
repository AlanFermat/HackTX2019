import React, {
  Component
} from 'react';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class CompanyCard extends Component {
	constructor(props) {
    	super(props);
    	console.log(this.props.name);
	}
	render() {
		const Query = "match (c:Company)<-[r:IS_SUPPLIER_FOR]-(n:Supplier) where c.name = '" + this.props.name + "' return n,r,c";
		return (
			<div>
				<Neo4jGraphRenderer url={process.env.REACT_APP_NEO4J_URI} user={process.env.REACT_APP_NEO4J_USER}
        password={process.env.REACT_APP_NEO4J_PASSWORD} 
        query={Query}/>
			</div>
		);
	}
}

export default CompanyCard;