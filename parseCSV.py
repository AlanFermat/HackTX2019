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
			if line[0] == ",":
				line = line[1:]
			if line[:4] != "Page":
				line_split = line.split(",,")
				if len(line_split) == 2:
					write_to.write(line_split[0] + "," + line_split[1])
				elif len(line_split) == 1:
					line = line_split[0]
					if line[-2:] == ",\n":
						write_to.write(line[:-2] + '\n')
					else:
						write_to.write(line)
			line_count += 1
	return result


parse('lenovo-supplier-list.csv', 16, 80)
