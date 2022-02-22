#!/bin/python
import pymysql
from functools import reduce

def connect():
    db = pymysql.connect(
        host="localhost",
        user="result_emails",
        password="result_emails",
        database="result_emails",
        cursorclass=pymysql.cursors.DictCursor
    )
    cur = db.cursor()
    return db,cur

def add_result(name,records,dname,course,semester) : 
    db,cur = connect()

    cur.execute('select * from results where name like \'{0}\''.format(name))
    if cur.fetchall() != () : 
        return False

    cur.execute('select * from departments where depname like \'{0}\''.format(dname))
    depID = cur.fetchall()[0]['id']
    print(depID)
    cur.execute('select * from courses_info where course like \'{0}\''.format(course))
    courseID = cur.fetchall()[0]['id']
    print(courseID)
    
    # see if already exists
    cur.execute('insert into results(name,uploadDate,emailSent,depID,courseID,semester) values(\'{0}\',CURDATE(),false,{1},{2},{3})'.format(name,depID,courseID,semester))
        
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
                values+=',NULL'
            else:
                values+=','+mark 
        cur.execute('insert into {0} values({1},false)'.format(name,values)) 
    db.commit() 
    db.close() 
    return True

def get_result(name):
    db,cur = connect()
    # fix the LIKE 
    cur.execute('select * from results where name like \'{0}\''.format(name))
    resultInfo = cur.fetchall()  
    if(resultInfo == ()):
        return [False]
    subjects=(resultInfo[0]['subjects']).split(',')
    cur.execute('select * from {0}'.format(name))
    records = cur.fetchall()
    db.close()
    return [True,{'resultInfo' : {'emailSent' : resultInfo[0]['emailSent'],
        'uploadDate' : resultInfo[0]['uploadDate'],'subjects' : subjects },'records':records}]

def get_results():
    db,cur = connect()
    cur.execute('select name,uploadDate,emailSent from results order by uploadDate desc')
    results = cur.fetchall()
    db.close()
    return results

def add_uuid_link(records,resultName):
    db,cur = connect()
    for i in records : 
        cur.execute('insert into result_links values(unhex(replace(uuid(),\'-\',\'\')),\'{0}\',\'{1}\')'.format(resultName,i['SI_No']))
    cur.execute('update results set emailSent = true where name like \'{0}\''.format(resultName))        
    db.commit()
    cur.execute('select hex(id) as id,SI_No from result_links where name like \'{0}\''.format(resultName))
    hexids=cur.fetchall()
    linkIDs={}
    for i in hexids:
        linkIDs[i['SI_No']] = i['id']
    db.close()
    return linkIDs

def get_data_from_linkID(linkID):
    db,cur = connect()
    cur.execute('select * from result_links where hex(id) like \'{0}\''.format(linkID))
    linkData = cur.fetchall()[0]
    cur.execute('select * from {0} where SI_No like \'{1}\''.format(linkData['name'],linkData['SI_No']))
    record = cur.fetchall()[0]
    print(record)
    if not record['emailRead']:
        cur.execute('update {0} set emailRead = true where SI_No like \'{1}\''.format(linkData['name'],record['SI_No']))
        db.commit()
    db.close()
    return record 

def get_departments():
    db,cur = connect()
    cur.execute('select * from departments order by depname')
    result= cur.fetchall()
    db.close()
    departments = list(map(lambda x: dict({'name' :x['depname'],'courses':x['courses'].split(',')} ),result))
    print(departments)
    return departments

def get_courses():
    db,cur = connect()
    cur.execute('select * from courses_info')
    result=cur.fetchall()     
    db.close()
    return result
