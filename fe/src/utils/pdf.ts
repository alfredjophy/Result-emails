import { saveAs } from "file-saver";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function saveBlob(blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

// accepts a JSON array and prints as a PDF
const generatePDF = async (title, data) => {
    const doc = new jsPDF() ;
    const columns = Object.keys(data[0]);
    const rows = data.map((i) => columns.map((c) => i[c]));
    doc.text(title, 14, 15);
    autoTable(doc,{head: [columns], body: rows ,startY: 20 });
    doc.output("pdfobjectnewwindow", `${title}.pdf`);
}

export default generatePDF;
