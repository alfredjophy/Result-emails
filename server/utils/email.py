import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from time import sleep
from utils.getEmailPage import getEmailPage

import multiprocessing as mp

CREDENTIALS = {"email" : 'YOUR_EMAIL',"password" : 'YOUR_PASSWORD'};


def _send_email(subject,records,linkIDs,exam_name):
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.ehlo()
    s.login(CREDENTIALS['email'],CREDENTIALS['password'])
    sleep(0.25)
    # detach the loop
    for i in records: 
        email = getEmailPage(linkIDs[i['SI_No']],exam_name)
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = CREDENTIALS['email']
        msg['To'] = i['Email']
        msg.attach(MIMEText(email,'html'))
        s.sendmail(CREDENTIALS['email'],i['Email'],msg.as_string())
        sleep(0.25)
    s.quit()

def send_email(s,r,l,n):
    p = mp.Process(target=_send_email,args=(s,r,l,n))
    p.start()



