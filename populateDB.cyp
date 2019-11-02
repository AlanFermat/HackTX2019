


load csv from 'https://raw.githubusercontent.com/AlanFermat/HackTX2019/master/Apple-Supplier-List.csv' as line CREATE (:SupplierLocation { name: line[0], address: line[1]})

load csv from 'https://raw.githubusercontent.com/AlanFermat/HackTX2019/master/Apple-Supplier-List.csv' as line CREATE (:Supplier { name: line[0], client:})

// dedupe supplier with the same name

MATCH (n:Supplier)
// using toLower function to group nodes with the same name but 
// different cases (eg Java, java, javA)
WITH n.name as name, collect(n) as nodes
// passing the nodes collection to mergeNodes APOC procedure
CALL apoc.refactor.mergeNodes(nodes) yield node
RETURN *

// create relationships with supplier and supplier location

MATCH (a:Supplier),(b:SupplierLocation)
WHERE a.name = b.name 
CREATE (a)-[r:LOCATED_IN]->(b)
RETURN type(r)


// create relationships with supplier and company

MATCH (a:Supplier),(b:Comapny)
WHERE a.client = b.name 
CREATE (a)-[r:IS_SUPPLIER_FOR]->(b)
RETURN type(r)