import csv

def parse(filename, headerline, footline):
	result = []
	write_to = open("new" + filename, 'w')
	company_name = None
	with open(filename) as csv_file:
		for line in csv_file:
			if line[0] == "\"":
				line = line[1:]
			row = line.split(",")
			if len(row) > 1:
				second = row[1]
				if second[:6] == " Ltd.\"":
					row[1] = second[6:]
				write_to.write(row[0] + "," + "".join(row[1:]))
	return result


parse('Sumsung-Supplier-List.csv', 0,0)
