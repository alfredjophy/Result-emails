def generateFileName(metadata):
    print(metadata)
    name=metadata['course'].replace(' ','_')+'_'+metadata['department'].replace(' ','_')
    if 'other' in metadata:
        name+='('+metadata['other']+')'
    name+='_S'+metadata['semester']+'_'+metadata['year']+'_'+metadata['month']+'_'+metadata['exam']
    return name
