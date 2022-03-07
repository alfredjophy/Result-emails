import { useQuery, useMutation } from "react-query";

const BASE_URL = "http://localhost:5050/api";

async function getResult(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useResultQuery = (rname, settings) =>
    useQuery(`result-${rname}`, () => getResult(rname), settings);

async function uploadFile(formData) {
    const response = await fetch(`${BASE_URL}/upload_sheet`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const data = await response.json();
    return data;
}

export const useUploadQuery = (settings) =>
    useMutation((formData) => uploadFile(formData), settings);

async function sendMail(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}/emails/send`, {
        method: "POST",
        body: { send: true },
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useSendMailQuery = (settings) =>
    useMutation(() => sendMail(rname), settings);

async function getDepartments() {
    const response = await fetch(`${BASE_URL}/departments`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useDepartmentsQuery = () =>
    useQuery("departments", getDepartments, { staleTime: 300000 });

async function getCourses() {
    const response = await fetch(`${BASE_URL}/courses`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useCoursesQuery = () =>
    useQuery("courses", getCourses, { staleTime: 300000 });

async function getDepartmentResults(dname) {
    console.log(dname);
    const response = await fetch(`${BASE_URL}/departments/${dname}/results`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useDepartmentResultsQuery = (dname, opts) =>
    useQuery(
        `departmentResults-${dname}`,
        () => getDepartmentResults(dname),
        opts
    );

async function getDepartmentStats(dname) {
    const response = await fetch(`${BASE_URL}/departments/${dname}/stats`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export async function getDepartmentDetails() {
    const departments = await getDepartments();
    const details = [];
    for (let i = 0; i < departments.length; i++) {
        const stats = await getDepartmentStats(departments[i].name);
        details.push({
            name: departments[i].name,
            stats: stats.readStats == undefined ? 0 : stats.readStats,
        });
    }
    return details;
}

export const useDepartmentStatsQuery = (dname) =>
    useQuery(`depStat-${dname}`, () => getDepartmentStats(dname));

async function getResultStats(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}/email/stats`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useResultStatsQuery = (rname) =>
    useQuery(`stats-${rname}`, () => getResultStats(rname));

async function getLoginStatus() {
    const response = await fetch(`${BASE_URL}/isLoggedIn`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useLoginStatus = (settings) =>
    useQuery(`auth-status`, getLoginStatus, settings);

async function submitLoginForm(formData) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const data = await response.json();
    return data;
}

export const useAuthLogin = (settings) =>
    useMutation((formData) => submitLoginForm(formData), settings);

async function authLogout() {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const useAuthLogout = (settings) =>
    useMutation(() => authLogout(), settings);

async function getStudentResult(id) {
    const response = await fetch(`${BASE_URL}/results/student/${id}`);
    const data = await response.json();
    return data;
}

export const useStudentResult = (id, settings) =>
    useQuery("student-result", () => getStudentResult(id));
