# from tkinter.dialog import DIALOG_ICON
from xml.dom.minidom import TypeInfo
import pandas as pd
import matplotlib as plt
import numpy as np
import os

teasury_2019 = "/Users/asghar/Desktop/Data Focused Python/Homework 4/daily-treasury-rates_2019.csv"
teasury_2020 = "/Users/asghar/Desktop/Data Focused Python/Homework 4/daily-treasury-rates_2020.csv"


daily_yield_curves_2 = pd.read_csv(teasury_2019)

daily_yield_curves_2.sort_index(inplace=True, axis=0, ascending=True)

np.savetxt("daily_yield_curves.txt", daily_yield_curves_2)

print(daily_yield_curves_2)


# daily_yield_curves = pd.read_csv(teasury_2019)

# daily_yield_curves.sort_index(inplace=True, axis=0, ascending=True)

# np.savetxt("daily_yield_curves.txt", daily_yield_curves)

# print(daily_yield_curves)

# for column in daily_yield_curves[['1 Mo', '2 Mo', '3 Mo', '6 Mo', '1 Yr', '2 Yr', '3 Yr', '5 Yr', '7 Yr', '10 Yr', '20 Yr', '30 Yr']]:
    
#     daily_yield_curves.values = daily_yield_curves.astype(float)



# daily_yield_curve = daily_yield_curves.astype(float)

# dataTypeSeries = daily_yield_curve.dtypes

# print(dataTypeSeries)