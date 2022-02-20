export async function getResults() {
    const response = await fetch("http://localhost:5050/get_results");
    const data = await response.json();
    return data;
}

export async function getResult(rname) {
    const response = await fetch(`http://localhost:5050/get_result/${rname}`);
    const data = await response.json();
    return data;
}

export async function uploadFile(formData) {
    const response = await fetch("http://localhost:5050/upload_sheet", {
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
