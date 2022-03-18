const months = [
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

const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
};

export const resultPrettyName = (rname) => {
    const data = rname.split("_");
    console.log(data);
    const dataLength = data.length;
    const course = data[0];
    const internal_exam = data[dataLength - 1];
    const month = months[data[dataLength - 2]];
    const year = data[dataLength - 3];
    const semester = data[dataLength - 4].substring(1);
    const department_and_other = range(1, dataLength - 4).reduce(
        (prev, x) => prev + data[x] + " ",
        ""
    );
    const department = department_and_other;
    return `${course} ${department} Semester ${semester} Internal Exam ${internal_exam} - ${month} ${year} `;
};
