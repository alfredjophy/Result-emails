import pymysql
import bcrypt

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

def get_user(username):
    db,cur = connect()
    cur.execute('select * from auth where username like \'{0}\''.format(username))
    result = cur.fetchall()[0]
    return {'username':result['username'],'level':result['level']}

def add_user(username,password,role):
    db,cur = connect()
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password.encode('utf-8'),salt)
    insert = 'insert into auth(username,level,pw_hash) values(%s,%s,_binary %s)'
    values = [username,role,pymysql.Binary(password_hash)]
    cur.execute(insert,values)
    db.commit()

def check_creds(username,password):
    db,cur = connect() 
    cur.execute('select * from auth') 
    users = cur.fetchall()
    matches = list(filter(lambda user: bcrypt.checkpw(password.encode('utf-8'),user['pw_hash']) and username == user['username'],users))
    if matches == [] :
        return False
    return True
