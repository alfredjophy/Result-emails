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

def add_result_to_db(name,records) : 
    # fix CURDATE()
    cur.execute('insert into results(name,uploadDate,emailSent) values(\'{0}\',CURDATE(),false)'.format(name))
    # this works 
    subjects=list(filter(lambda x: x not in ['SI No','Name','Email'],(records[0].keys())))
    cur.execute('update results set subjects = \'{0}\' where Name = \'{1}\''.format(reduce(lambda str,subject :'{0},{1}'.format(str,subject.strip()),subjects),name))
    
    subjectsMachineR=list(map(lambda x : x.strip().replace(' ','_'),subjects))
    subject_args=reduce(lambda str, subject :'{0},{1} varchar(50)'.format(str,subject),subjectsMachineR,'')
    cur.execute('create table {0}(SI_No varchar(20),Name varchar(35),Email varchar(45){1},emailRead boolean default false)'.format(name,subject_args))
    
    for i in records : 
        values = '\'{0}\',\'{1}\',\'{2}\''.format(i['SI No'],i['Name'],i['Email'])
        for j in subjects:
            mark = str(i[j])
            if mark == 'nan':
                print('YES')
                values+=',NULL'
            else:
                values+=','+mark
        cur.execute('insert into {0} values({1},false)'.format(name,values))
    db.commit()
    return True

def get_result_from_db(name):
    # fix the LIKE 
    try: 
        cur.execute('select * from results where name like \'{0}\''.format(name))
        resultInfo = cur.fetchall()  
    except:
        return [False]
    if(resultInfo == ()):
        return [False]

    subjects=(resultInfo[0]['subjects']).split(',')
    cur.execute('select * from {0}'.format(name))
    records = cur.fetchall()
    return [True,{'resultInfo' : {'emailSent' : resultInfo[0]['emailSent'],
        'uploadDate' : resultInfo[0]['uploadDate'],'subjects' : subjects },'records':records}]

def get_results_from_db():
    cur.execute('select name,uploadDate,emailSent from results order by uploadDate')
    results = cur.fetchall()
    return results

