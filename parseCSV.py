import csv

def parse(filename, headerline, footline):
	result = []
	write_to = open("new" + filename, 'w')
	with open(filename) as csv_file:
		line_count = 0
		for line in csv_file:
			if line_count <= headerline or line_count >= footline:
				line_count += 1
				continue
			if line[-2] == ",":
				result.append(line)
			else:
				if result[-1][-2]==',':
					result[-1] += line
				else:
					result.append(line)
			line_count += 1
	for company in result:
		row = company.split("\t")
		print(row)
		# if row[1]:
		# 	address = row[1].split("\n")
		# 	print(address)
	return result


parse('Sumsung-Supplier-List.csv', 1, 1450)
