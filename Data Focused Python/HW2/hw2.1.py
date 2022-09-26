cmefile = "hw2/cme.20210709.c.pa2"
raw_lines = []
upper_res, lower_res = "", ""
with open(cmefile, 'r') as file:
    for line in file.readlines():
        raw_lines.append(line)

string_format1 = "{:10}{:11}{:11}{:12}{:10}{:10}\n"
string_format2 = "{:10}{:11}{:11}{:9}{:10}\n"
    
for line in raw_lines:
    record_id = line[:2]
    commodity_code = line[5:15].strip()
    if record_id == "B ":
        contract_month_fut = line[18:24]
        contract_month_opt = line[27:33]
        exchange_acronym = line[2:5]
        contract_type = line[15:18] #product type code
        expiration_date = line[91:99]
        if commodity_code == "CL" and contract_month_fut >= "202109" and contract_month_fut <= "202312":
            upper_res += string_format1.format(commodity_code, contract_month_fut[0:4] + "-" + contract_month_fut[4:], contract_type.capitalize(), expiration_date[0:4] + '-' + expiration_date[4:6] + '-' + expiration_date[6:], "", "")
        elif commodity_code == "LO" and contract_month_opt >= "202109" and contract_month_opt <= "202312":
            upper_res += string_format1.format(line[99:109].strip(), contract_month_opt[0:4] + "-" + contract_month_opt[4:], "Opt", "", commodity_code, expiration_date[0:4] + '-' + expiration_date[4:6] + '-' + expiration_date[6:])
    elif record_id == "81":
        contract_month_fut = line[29:35]
        contract_month_opt = line[38:44]
        contract_type = line[25:28]
        strike_price = None
        settlement_price = format(int(line[108:122])/100.0, '.2f')
        if contract_type == "FUT":
            contract_type = "Fut"
            strike_price = ""
        elif line[28] == "C":
            contract_type = "Call"
            strike_price = round(int(line[47:54])/100.0, 2)
        elif line[28] == "P":
            contract_type = "Put"
            strike_price = round(int(line[47:54])/100.0, 2)
        if commodity_code == "CL" and contract_month_fut >= "202109" and contract_month_fut <= "202312":
            lower_res += string_format2.format(commodity_code, contract_month_fut[0:4] + "-" + contract_month_fut[4:], contract_type, strike_price, settlement_price)
        elif commodity_code == "LO" and contract_month_opt >= "202109" and contract_month_opt <= "202312":
            lower_res += string_format2.format(line[15:25].strip(), contract_month_opt[0:4] + "-" + contract_month_opt[4:], contract_type, strike_price, settlement_price)

upper_res = 'Futures   Contract   Contract   Futures     Options   Options\n' + \
            'Code      Month      Type       Exp Date    Code      Exp Date\n' + \
            upper_res
lower_res = 'Futures   Contract   Contract   Strike   Settlement\n' + \
            'Code      Month      Type       Price    Price\n' + \
            lower_res

with open('CL_expirations_and_settlements.txt','w') as file:
    file.write(upper_res)
    file.write(lower_res)