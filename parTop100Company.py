def parseTop100(filename):
	f = open(filename)
	write_to = open("top_100_company_name.csv", 'w')
	for line in filename:
			write_to.write('"'+str(line[0])+'",'+"\n")


parseTop100("top_100_company_info.csv")