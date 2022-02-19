#!/bin/python
import pymysql
from functools import reduce

db = pymysql.connect(
    host="localhost",
    user="result_emails",
    password="result_emails",
    database="result_emails",
    cursorclass=pymysql.cursors.DictCursor
)
cur = db.cursor()

def add_result_to_db(name) : 
    cur.execute('insert into results(name,uploadDate,emailSent) values(\'{0}\',CURDATE(),false)'.format(name))
    db.commit()
    return True

def add_records_to_db(fileName,records) :
    subjects=list(filter(lambda x: x not in ['SI No','Name','Email'],(records[0].keys())))
    cur.execute('update results set subjects = \'{0}\' where Name = \'{1}\''.format(reduce(lambda str,subject :'{0},{1}'.format(str,subject.strip()),subjects),fileName))
    subjectsMachineR=list(map(lambda x : x.replace(' ',''),subjects))
    subject_args=reduce(lambda str, subject :'{0},{1} varchar(50)'.format(str,subject),subjectsMachineR,'')
    cur.execute('create table {0}(SI_No varchar(20),Name varchar(35),Email varchar(45){1},emailRead boolean default false)'.format(fileName,subject_args))
    
    for i in records : 
        values = '\'{0}\',\'{1}\',\'{2}\''.format(i['SI No'],i['Name'],i['Email'])
        for j in subjects:
            mark = str(i[j])
            if mark == 'nan':
                print('YES')
                values+=',NULL'
            else:
                values+=','+mark
        cur.execute('insert into {0} values({1},false)'.format(fileName,values))
    db.commit()
    return True

    

