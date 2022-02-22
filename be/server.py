#!/bin/python
from flask import Flask,jsonify,request
import os
import pathlib

import db_functions as db
from utils.excel import verifySheet,getRecords,saveFile
from utils.generateFileName import generateFileName
from utils.email import send_email

from functools import reduce

app = Flask(__name__)

FILE_STORAGE_PATH = pathlib.Path.home()/'files'

if not FILE_STORAGE_PATH.is_dir():
    os.mkdir(FILE_STORAGE_PATH)

@app.route('/api/status',methods=['GET'])
def app_status() : 
    return jsonify({'status':'working'}),200

@app.route('/api/upload_sheet',methods=['POST'])
def upload_sheet() : 
    metadata=request.form
    print(metadata)
    file=request.files['file']

    sheetStatus=verifySheet(file)
    if not sheetStatus[0] : 
        return jsonify({"error" : sheetStatus[2]}),sheetStatus[1]
    fileName = generateFileName(metadata)
    saveFile(file,FILE_STORAGE_PATH/'{0}.xlsx'.format(fileName))
    status = db.add_result(fileName,getRecords(file),metadata['department'],metadata['course'],metadata['semester'])
    if not status :
        return jsonify({'error':'file already exists'}),415
    return jsonify({'resultName' : fileName}),200

@app.route('/api/departments/<dname>/results',methods=['GET'])
def get_result(dname) :
    if not db.in_department(dname) :
        return jsonify({"error" : "department not found"}),404
    result = db.get_department_results(dname)
    return jsonify(result),200

@app.route('/api/results/<rname>')
def getResult(rname):
    result=db.get_result(rname)
    if not result :
        return jsonify({'error':'result not found'}),404
    return jsonify(result),200

@app.route('/api/results/<resultName>/emails/send',methods=['POST'])
def sendmail(resultName):
    result = db.get_result(resultName)
    if not result :
        return jsonify({"error" : "result not found"}),404
    elif result['resultInfo']['emailSent']:
        return jsonify({'error':'email already sent'}),415
    records = result['records']
    linkIDs = db.add_uuid_link(records,resultName)
    send_email('this is threaded',records,linkIDs) 
    return jsonify({'status' : 'Emails sent successfully'}),200

@app.route('/api/results/<resultName>/email/stats')
def getResultEmailReadStats(resultName):
    result = db.get_result(resultName)
    if not result :
        return jsonify({"error" : "result not found"}),404
    elif not result['resultInfo']['emailSent']:
        return jsonify({'emailSent':False}),200
    records = result['records']
    readCount=reduce(lambda prev,x: prev+x['emailRead'],records,0)
    totalCount = len(records)
    print(readCount,totalCount)
    return jsonify({'emailSent':True,'readRatio':readCount/totalCount}),200

@app.route('/api/results/student/<linkID>',methods=['GET'])
def getResultFromLinkID(linkID) : 
    record=db.get_data_from_linkID(linkID)    
    if record == () :
        return jsonify({'error' : 'record not found'}),404
    return jsonify(record),200

@app.route('/api/departments',methods=['GET'])
def get_departments():
    departments = db.get_departments()
    return jsonify(departments),200

@app.route('/api/courses',methods=['GET'])
def get_course():
    record  = db.get_courses()
    if record == ():
        return jsonify({'error':'course not found'}),404
    return jsonify(record),200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)


