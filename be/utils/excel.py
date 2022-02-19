#!/bin/bash
import pandas as pd

def verifySheet(sheet) : 
    try : 
        results = pd.read_excel(sheet)
    except:
        return [False,415,"Wrong file type"]
    columns = results.columns
    if not ('SI No' in columns and 'Name' in columns and 'Email' in columns):
        return [False,400,"Invalid columns names"]
    return [True]

def getRecords(sheet):
    results_sheet=pd.read_excel(sheet)
    results=results_sheet.to_dict(orient="records")
    return results



