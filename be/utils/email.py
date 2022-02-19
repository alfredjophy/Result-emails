import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

CREDENTIALS = {"email" : 'alfredjophy129@gmail.com',"password" : 'wxtfhaqjaxhmgxml'};

s = smtplib.SMTP('smtp.gmail.com', 587)


def send_email(subject,records,linkIDs):
    s.starttls()
    s.login(CREDENTIALS['email'],CREDENTIALS['password'])
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

    s.quit()


