# Libraries
# import os, re
# import pandas as pd
# import numpy as np
# from cleanco import cleanco

# def normalize_company_name(csv):
# 	# Import supplier names to dataframe
# 	df = pd.read_csv(csv, names=['Suppliers'], usecols=[0])
# 	# print(df)
# 	# ----------------------------------------
# 	# Convert to uppercase
# 	df['Suppliers'] = df['Suppliers'].str.upper()
# 	# Remove commas
# 	df.Suppliers = df.Suppliers.str.replace(',', '')
# 	# Remove hyphens
# 	df.Suppliers = df.Suppliers.str.replace(' - ', ' ')
# 	# Remove text between parenthesis 
# 	df.Suppliers = df.Suppliers.str.replace(r"\(.*\)","")
# 	#
# 	df.Suppliers = df.Suppliers.str.replace(' AND ', ' & ')
# 	# Remove spaces in the begining/end
# 	df.Suppliers = df.Suppliers.str.strip()
# 	# Remove business entities extensions (1)
# 	df.Suppliers = df.Suppliers.apply(lambda x: cleanco(x).clean_name() if type(x)==str else x)
# 	# Remove dots
# 	df.Suppliers = df.Suppliers.str.replace('.', "")
# 	# Remove business entities extensions (2) - after removing the dots
# 	df.Suppliers = df.Suppliers.apply(lambda x: cleanco(x).clean_name() if type(x)==str else x)
# 	# Specific Polish to companies
# 	df.Suppliers = df.Suppliers.str.replace('SP ZOO', '')
# 	return df

# print(df.Suppliers.loc[4])


def parse_and_write(csv):
	# df = normalize_company_name(csv)
	cnt = 0
	write_to = open("top_100_company_name.csv", 'w')
	with open(csv) as csv_file:
		for line in csv_file:
			if cnt == 0:
				cnt += 1
				continue
			row = line.split(",")
			# name = row[0].split(",")
			# countries = row[1][:-1].split(",")
			# for country in countries:
			# 	write_to.write(" ".join(name) + ","+country + "\n")
			# write_to.write(row[0] + row[1])
			write_to.write(row[0] + "," + "\n")

if __name__ == '__main__':
	f = "data/top_100_company_info.csv"
	parse_and_write(f)





