#!/bin/python
from flask import Flask,jsonify,request,session
import os
import pathlib
from functools import reduce
from flask_cors import CORS

import db_functions as db
import auth_db as auth
from utils.excel import verifySheet,getRecords,saveFile
from utils.generateFileName import generateFileName
from utils.getStudentResultPage import getStudentResultPage
from utils.email import send_email


app = Flask(__name__)
app.secret_key = 'Zdds6FFselWSsCPlPPxMTnnyyhRA0W2p/72xAxN/Y79H3UZFYTHU4xcQzg0Qu4XBekFC35bUQTS'
# ooooh...my keys are exposed

CORS(app)

FILE_STORAGE_PATH = pathlib.Path.home()/'files'

if not FILE_STORAGE_PATH.is_dir():
    os.mkdir(FILE_STORAGE_PATH)

@app.route('/api/isLoggedIn',methods=['GET'])
def is_logged_in():
    if 'username' in session:
        user = auth.get_user(session['username'])
        user['loginStatus'] = True
        return jsonify(user),200
    return jsonify({'loginStatus':False}),200

@app.route('/api/login',methods=['POST'])
def auth_login():
    username,password = request.form['username'],request.form['password']
    session.clear()
    print(username,password)
    if auth.check_creds(username,password) :
        user = auth.get_user(username)
        session['username'] = user['username']
        session['level'] = user['level']
    else:
        return jsonify({'error':'bad credentials'}),415
    user = auth.get_user(username)
    return jsonify(user),200

@app.route('/api/logout',methods=['POST'])
def auth_logout():
    session.clear()
    return jsonify({'status':'logged out'}),200
    
def authorization(level):
    if 'username' in session and 'level' in session and session['level'] <= level :
        return True
    return False

@app.route('/api/status',methods=['GET'])
def app_status() : 
    return jsonify({'status':'working'}),200

@app.route('/api/upload_sheet',methods=['POST'])
def upload_sheet() : 
    if not authorization(0):
        return jsonify({'error':'unauthenticated'}),415
    metadata=request.form
    print(metadata)
    file=request.files['file']

    sheetStatus=verifySheet(file)
    print(sheetStatus)
    if not sheetStatus[0] : 
        return jsonify({"error" : sheetStatus[2]}),sheetStatus[1]
    fileName = generateFileName(metadata)
    print(fileName)
    saveFile(file,FILE_STORAGE_PATH/'{0}.xlsx'.format(fileName))
    status = db.add_result(fileName,getRecords(file),metadata['department'],metadata['course'],metadata['semester'],metadata['exam'],metadata['month'],metadata['year'])
    if not status :
        return jsonify({'error':'file already exists'}),415
    return jsonify({'resultName' : fileName}),200

@app.route('/api/departments/<dname>/results',methods=['GET'])
def get_result(dname) :
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415
    if not db.in_department(dname) :
        return jsonify({"error" : "department not found"}),404
    result = db.get_department_results(dname)
    return jsonify(result),200

# this is not good
@app.route('/api/departments/<dname>/stats',methods=['GET'])
def get_department_stats(dname):
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415

    if not db.in_department(dname) :
        return jsonify({"error" : "department not found"}),404
    results = db.get_department_results(dname)
    
    if results == ():
        return jsonify({'error':'no records found'}),404

    records = list(map(lambda x: db.get_result(x['name']),results))

    def get_stats(records,p):
        readCount=reduce(lambda prev,x: prev+x['emailRead'],records,0)
        totalCount = len(records)
        try :
            return [readCount+p[0],totalCount+p[1]]
        except :
            return 0
    stat=reduce(lambda prev,x: get_stats(x['records'],prev),records,[0,0])

    return jsonify({'readStats' : (stat[0]/stat[1])*100}),200

@app.route('/api/results/<rname>')
def getResult(rname):
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415

    result=db.get_result(rname)
    if not result :
        return jsonify({'error':'result not found'}),404
    return jsonify(result),200

@app.route('/api/results/<resultName>/emails/send',methods=['POST'])
def sendmail(resultName):
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415

    result = db.get_result(resultName)
    if not result :
        return jsonify({"error" : "result not found"}),404
    elif result['resultInfo']['emailSent']:
        return jsonify({'error':'email already sent'}),415
    records = result['records']
    linkIDs = db.add_uuid_link(records,resultName)
    send_email('Subject',records,linkIDs,resultName) 
    return jsonify({'status' : 'Emails sent successfully'}),200

@app.route('/api/results/<resultName>/email/stats')
def getResultEmailReadStats(resultName):
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415

    result = db.get_result(resultName)
    if not result :
        return jsonify({"error" : "result not found"}),404
    elif not result['resultInfo']['emailSent']:
        return jsonify({'emailSent':False}),200
    records = result['records']
    readCount=reduce(lambda prev,x: prev+x['emailRead'],records,0)
    totalCount = len(records)
    return jsonify({'emailSent':True,'read':readCount,'totalCount':totalCount}),200


@app.route('/api/results/student/<linkID>',methods=['GET'])
def getResultFromLinkID(linkID) : 
    record=db.get_data_from_linkID(linkID)    
    if record == () :
        return jsonify({'error' : 'record not found'}),404
    page = getStudentResultPage(record['record'],record['result_name'])   
    return page,200

@app.route('/api/departments',methods=['GET'])
def get_departments():
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415

    departments = db.get_departments()
    return jsonify(departments),200

@app.route('/api/courses',methods=['GET'])
def get_course():
    if not authorization(1):
        return jsonify({'error':'unauthenticated'}),415

    record  = db.get_courses()
    if record == ():
        return jsonify({'error':'course not found'}),404
    return jsonify(record),200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)


