import React, {
  Component
} from 'react';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';
    
  render() {
    return ( 
      <div>
      <Neo4jGraphRenderer url={process.env.REACT_APP_NEO4J_URI} user={process.env.REACT_APP_NEO4J_USER}
        password={process.env.REACT_APP_NEO4J_PASSWORD} 
        query="match (c1:Company)<-[r1:IS_SUPPLIER_FOR]-(n:Supplier)-[r2:IS_SUPPLIER_FOR]->(c2:Company) return n,r1,c1,r2,c2"/>
    </div>
    );
  }
}
export default CompanyInfo;
