import { useQuery, useMutation } from "react-query";

const BASE_URL = "http://localhost:5050/api";

async function getResult(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}`);
    const data = await response.json();
    return data;
}

export const useResultQuery = (rname, settings) =>
    useQuery(`result-${rname}`, () => getResult(rname), settings);

async function uploadFile(formData) {
    const response = await fetch(`${BASE_URL}/upload_sheet`, {
        method: "POST",
        body: formData,
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
    });
    const data = await response.json();
    return data;
}

export const useSendMailQuery = (settings) =>
    useMutation(() => sendMail(rname), settings);

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

async function getDepartmentStats(dname) {
    const response = await fetch(`${BASE_URL}/departments/${dname}/stats`);
    const data = await response.json();
    return data;
}

export const useDepartmentStatsQuery = (dname) =>
    useQuery(`depStat-${dname}`, () => getDepartmentStats(dname));

async function getResultStats(rname) {
    const response = await fetch(`${BASE_URL}/results/${rname}/email/stats`);
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
    return data.loginStatus;
}

export const useLoginStatus = () => useQuery(`auth-status`, getLoginStatus);

async function getUserDetails() {
    const response = await fetch(`${BASE_URL}/user`);
    const data = await response.json();
    return data;
}

export const useUserData = () => useQuery(`auth-user`, getUserDetails);

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
