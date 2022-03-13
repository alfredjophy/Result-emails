def generateFileName(metadata):
    print(metadata)
    try:
        return metadata['course'].replace(' ','_')+'_'+metadata['department'].replace(' ','_')+'_S'+metadata['semester']+'_'+metadata['year']+'_'+metadata['month']+'_'+metadata['exam']
    except:
        print('fuck')
