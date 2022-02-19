#!/bin/python
from flask import Flask,jsonify,request
import os
import pathlib

from db_functions import add_result_to_db,get_result_from_db,get_results_from_db,add_uuid_link_to_db,get_data_from_linkID

from utils.excel import verifySheet,getRecords
from utils.generateFileName import generateFileName
from utils.email import send_email

app = Flask(__name__)

FILE_STORAGE_PATH = pathlib.Path.home()/'files'

if not FILE_STORAGE_PATH.is_dir():
    os.mkdir(FILE_STORAGE_PATH)

@app.route('/',methods=['GET'])
def app_status() : 
    return jsonify({'status':'working'}),200

@app.route('/upload_sheet',methods=['POST'])
def upload_sheet() : 
    metadata=request.form
    file=request.files['file']

    sheetStatus=verifySheet(file)
    if not sheetStatus[0] : 
        return jsonify({"error" : sheetStatus[2]}),sheetStatus[1]

    fileName = generateFileName(metadata)
    file.save(FILE_STORAGE_PATH/'{0}'.format(fileName))

    add_result_to_db(fileName,getRecords(file))
    return jsonify({'resultName' : fileName}),200

@app.route('/get_result/<resultName>',methods=['GET'])
def get_result(resultName) : 
    result = get_result_from_db(resultName)
    if not result[0] :
        return jsonify({"error" : "result not found"}),404
    return jsonify(result[1]),200

@app.route('/get_results',methods=['GET'])
def get_results() : 
    results = get_results_from_db()
    return jsonify(results),200

@app.route('/results/<resultName>/sendmail',methods=['GET'])
def sendmail(resultName):
    result = get_result_from_db(resultName)
    if not result[0] :
        return jsonify({"error" : "result not found"}),404
    elif result[1]['resultInfo']['emailSent']:
        return jsonify({'error':'email already sent'}),415
    records = result[1]['records']
    linkIDs = add_uuid_link_to_db(records,resultName)
    send_email('FUCCCCKKK',records,linkIDs) 
    return jsonify({'status' : 'Emails sent successfully'}),200

@app.route('/results/student/<linkID>',methods=['GET'])
def getResultFromLinkID(linkID) : 
    record=get_data_from_linkID(linkID)    
    if record == () :
        return jsonify({'error' : 'record not found'}),404
    return jsonify(record),200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)


