import { useQuery, useMutation } from "react-query";

const BASE_URL = "http://localhost:5050/api";

async function getResult(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}`);
    const data = await response.json();
    return data;
}
export const useResultQuery = (rname) =>
    useQuery(`result-${rname}`, () => getResult(rname));

async function uploadFile(formData) {
    const response = await fetch(`${BASE_URL}/upload_sheet`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    return data;
}
export const useUploadQuery = (formData) =>
    useMutation(() => uploadFile(formData), {
        onSuccess: (data, variables, context) => {
            if (data.error) {
                alert(data.error);
                return;
            }
            navigate(`/results/${data.resultName}`);
        },
    });

async function sendMail(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}/emails/send`, {
        method: "POST",
        body: { send: true },
    });
    const data = await response.json();
    return data;
}

export const useSendMailQuery = (rname) => useMutation(() => sendMail(rname));

async function getDepartments() {
    const response = await fetch(`${BASE_URL}/departments`);
    const data = await response.json();
    return data;
}

export const useDepartmentsQuery = () =>
    useQuery("departments", getDepartments, { staleTime: 300000 });

async function getCourses() {
    const response = await fetch(`${BASE_URL}/courses`);
    const data = await response.json();
    return data;
}

export const useCoursesQuery = () =>
    useQuery("courses", getCourses, { staleTime: 300000 });

async function getDepartmentResults(dname) {
    console.log(dname);
    const response = await fetch(`${BASE_URL}/departments/${dname}/results`);
    const data = await response.json();
    return data;
}

export const useDepartmentResultsQuery = (dname, opts) =>
    useQuery(
        `departmentResults-${dname}`,
        () => getDepartmentResults(dname),
        opts
    );

async function getResultStats(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}/email/stats`);
    const data = await response.json();
    return data;
}

export const useResultStatsQuery = (rname) =>
    useQuery(`stats-${rname}`, () => getResultStats(rname));
