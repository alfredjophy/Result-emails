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

def getEmailPage(link,exam_name):
    data = exam_name.replace('_',' ').split(' ')
    dataLength = len(data)
    internal_exam = data[dataLength-1]
    course = data[0]
    month = data[dataLength-2]
    year = data[dataLength-3]
    semester = data[dataLength-4]
    department = reduce(lambda prev,x:prev+' '+data[x],range(1,dataLength-4),'')

    pretty_exam_name = '{course} {department} Semester {semester} Internal Exam {internal_exam} - {month} {year}'.format(course=course,department=department,semester=semester,internal_exam=internal_exam,month=months[int(month)],year=year)

    html='''<html>
            <head>
             <title>Results : {exam_name}</title>
            </head>
            <style>
            </style>
            <body >
                <h1>{exam_name}</h1>
                <a href=https://resultmails.jijuamathew.in/api/results/student/{link}>Click Here To View Your Results</a>
            </body>
            </html>'''.format(link=link,exam_name=pretty_exam_name)

    return html
    


    
