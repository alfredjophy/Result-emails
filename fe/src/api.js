const BASE_URL = "http://localhost:5050/api";

export async function getResults() {
    const response = await fetch(`${BASE_URL}/get_results`);
    const data = await response.json();
    return data;
}

export async function getResult(rname) {
    const response = await fetch(`http://localhost:5050/get_result/${rname}`);
    const data = await response.json();
    return data;
}

export async function uploadFile(formData) {
    const response = await fetch(`${BASE_URL}/upload_sheet`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    return data;
}

export async function sendMail(rname) {
    const response = await fetch(
        `http://localhost:5050/results/${rname}/sendmail`,
        {
            method: "POST",
            body: { send: true },
        }
    );
    const data = await response.json();
    return data;
}

export async function getDepartments() {
    const response = await fetch(`${BASE_URL}/departments`);
    const data = await response.json();
    return data;
}

export async function getCourses() {
    const response = await fetch(`${BASE_URL}/courses`);
    const data = await response.json();
    return data;
}
