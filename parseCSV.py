import csv

def parse(filename, headerline, footline):
	result = []
	write_to = open("new" + filename, 'w')
	company_name = None
	with open(filename) as csv_file:
		line_count = 0
		for line in csv_file:
			row = line.split(" \t")
			write_to.write(row[0] + "," + "\"" + row[1][:-1] + "\"" + "\n")
	return result


parse('acer-supplier-list.csv', 0,0)
