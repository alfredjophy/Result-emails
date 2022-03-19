import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

CREDENTIALS = {"email" : 'feedback@stthomas.ac.in',"password" : 'Saj184301'};

s = smtplib.SMTP('smtp.gmail.com', 587)
s.ehlo()
s.starttls()
s.ehlo()
s.login(CREDENTIALS['email'],CREDENTIALS['password'])
s.sendmail(CREDENTIALS['email'],'alfredjophy129@gmail.com','Hello wordl')
s.quit()






