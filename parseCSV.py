import csv

def parse(filename, headerline, footline):
	result = []
	write_to = open("new" + filename, 'w')
	company_name = None
	with open(filename) as csv_file:
		line_count = 0
		for line in csv_file:
			if line_count <= headerline or line_count >= footline:
				line_count += 1
				continue
			row = []
			if line[0] != ",":
				row = line.split(",")
				company_name = row[0]
				# print ("".join(row[1:]))
				write_to.write(company_name + "," + "".join(row[1:]))
			else:
				write_to.write(company_name + line)
	return result


parse('Sumsung-Supplier-List.csv', -1, 1450)
