import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from time import sleep

import multiprocessing as mp

CREDENTIALS = {"email" : 'alfredjophy129@gmail.com',"password" : 'wxtfhaqjaxhmgxml'};


def _send_email(subject,records,linkIDs):
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.ehlo()
    s.login(CREDENTIALS['email'],CREDENTIALS['password'])
    sleep(0.25)
    # detach the loop
    for i in records: 
        email = '''
        <html><head></head>
        <body>
            <h3>Exam Results</h3>
            <a href=\"localhost/results/student/{0}\">Click Here To View Your Results</a>
            <p>Have a nice day</p>
        </body></html>
        '''.format(linkIDs[i['SI_No']])
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = CREDENTIALS['email']
        msg['To'] = i['Email']
        msg.attach(MIMEText(email,'html'))
        s.sendmail(CREDENTIALS['email'],i['Email'],msg.as_string())
        sleep(0.25)
    s.quit()

def send_email(s,r,l):
    p = mp.Process(target=_send_email,args=(s,r,l))
    p.start()



