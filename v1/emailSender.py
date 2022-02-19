#!/bin/python
import pandas as pd
# Install dependencies by : 
# pip install pandas
# pip install openpyxl
import smtplib

# Prefix './' to file name if in the same directory
excel_sheet_path = input("Enter path for the excel sheet : ")
emailID = input("Enter your email address : ")
# If you have 2FA with your gmail account, create a app password and use that
password = input("Enter your password : ")
subject = input("Enter the subject for the email : ")

exam_result_sheet = pd.read_excel(excel_sheet_path)
exam_results = exam_result_sheet.to_dict(orient='records')

## Assumptions
## Columns are named: 'SI No' 'Name' 'Email' while the rest being subject names
s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login(emailID,password)

for i in exam_results :
    email_body = 'Hi {0},\nHere are your exam results\n'.format(i['Name'])
    for j in filter(lambda x: x not in ['SI No','Name','Email'],i.keys()):
        email_body+='\n{0}  {1}'.format(j,i[j])
    print('Sending results to {0} | {1}'.format(i['Name'],i['Email']))
    s.sendmail(emailID,i['Email'],"Subject : {0}\n\n{1}".format(subject,email_body))
s.quit()
