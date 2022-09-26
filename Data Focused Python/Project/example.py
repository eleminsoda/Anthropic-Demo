# To "scrape" a web site
#  Open a connection to the web page
#  Download the source (text) of the web page
#  Convert the source to an HTML-aware 
# BeautifulSoup object
#  Examine the BeautifulSoup object for HTML tags:  
# <tag ...> ... </tag>
#  Extract the tagged information you want from the 
# BeautifulSoup object

from urllib.request import urlopen  # b_soup_1.py
from bs4 import BeautifulSoup
html = urlopen('https://home.treasury.gov/'
  'resource-center/data-chart-center/'
  'interest-rates/TextView?type=daily_treasury'
  '_yield_curve&field_tdr_date_value=2019')
bsyc = BeautifulSoup(html.read(), "lxml")
fout = open('bsyc_temp.txt', 'wt',
encoding='utf-8')
fout.write(str(bsyc))
fout.close()