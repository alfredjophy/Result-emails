def generateFileName(metadata):
    return metadata['course'].replace(' ','_')+'_'+metadata['department'].replace(' ','_')+'_S'+metadata['semester']+'_'+metadata['exam_date'].replace("-", "_").replace("-", "_")
