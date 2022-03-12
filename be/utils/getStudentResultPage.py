from functools import reduce
months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

def getStudentResultPage(record,exam_name):
    print(record)

    #name of subjects
    subjects = filter(lambda x: x not in ['Name','Email','Registration_No','emailRead','SI_No'],record.keys())
    name=record['Name']
    registration_no = record['Registration_No']
    subjects_rows = reduce(lambda prev,x: prev+'''<tr>
                                            <td>{0}</td>
                                            <td>{1}</td>
                                        </tr>'''.format(x.replace('_',' '),record[x]),subjects,'')
                          
    data = exam_name.split('_')
    dataLength = len(data)
    internal_exam = data[dataLength-1]
    course = data[0]
    month = data[dataLength-2]
    year = data[dataLength-3]
    semester = data[dataLength-4][1:]
    department = reduce(lambda prev,x:prev+' '+data[x],range(1,dataLength-4),'')

    pretty_exam_name = '{course} {department} Semester {semester} Internal Exam {internal_exam} - {month} {year}'.format(course=course,department=department,semester=semester,internal_exam=internal_exam,month=months[int(month)],year=year)


    html='''<html>
            <head>
             <title>Results : {name}</title>
            </head>
            <style>
            .container{{
                margin-top: 6rem;
                width: 100vw;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }}
            .tab{{
                width: 50%;
                overflow-x: auto;
                text-align: center;
                border-collapse: collapse;
                border: 1px solid black;
            }}
            tr,th,td{{
                border-collapse: collapse;
                border: 1px solid black;
                height: 35px;
            }}
            </style>
            <body class='container'>
                <h1>{result_name}</h1>
                <h2>{registration_no}  {name}</h2>
                <table class='tab'>
                <tr>
                    <th>Subject</th>
                    <th>Percentage</th>
                </tr>
                {subjects_rows}
                </table>
            </body>
            </html>'''.format(name=name,result_name=pretty_exam_name,registration_no=registration_no,subjects_rows=subjects_rows)

    return html
    


    
