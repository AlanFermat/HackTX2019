def parseTop100(filename):
	f = open(filename)
	line_count = 0
	row = []
	company_graph = {}
	write_to = open("top_100_company_info.csv", 'w')
	write_to.write("Name, Revenues($M), Profits($M), Assets($M), Market Value($M), Employees\n")
	for line in f:
		line_count += 1
		row.append(line[:-1])
		if line_count % 11 == 0:
			write_to.write(row[1]+","+"\""+row[2]+"\""+","+"\""+row[4]+"\""+","+"\""+row[6]+"\""+","+"\"" +row[7]+"\""+","+"\""+row[-2]+"\""+"\n")
			row = []


parseTop100("top100.txt")