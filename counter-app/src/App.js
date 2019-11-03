import React, { Component } from "react";
import "./App.css";
import neo4j from "neo4j-driver/lib/browser/neo4j-web";
import CompanyForm from "./component/hacktxfa2019";
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class App extends Component{
    constructor(props) {
    super(props);
  }

  render() {
      return (
    <div>
      <CompanyForm />
      <Neo4jGraphRenderer url={process.env.REACT_APP_NEO4J_URI} user={process.env.REACT_APP_NEO4J_USER}
        password={process.env.REACT_APP_NEO4J_PASSWORD} 
        query="match (c1:Company)<-[r1:IS_SUPPLIER_FOR]-(n:Supplier)-[r2:IS_SUPPLIER_FOR]->(c2:Company) return n,r1,c1,r2,c2"/>
    </div>
    );
  }
}

export default App;
