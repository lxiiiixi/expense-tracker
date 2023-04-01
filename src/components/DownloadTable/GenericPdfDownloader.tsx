import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenericPdfDownloader = ({
    rootElementId,
    downloadFileName,
    children,
}: {
    rootElementId: string;
    downloadFileName: string;
    children: React.ReactNode;
}) => {
    const downloadPdfDocument = () => {
        const myDiv = document.getElementById(rootElementId) as HTMLElement;
        const width = myDiv.offsetWidth;
        const height = myDiv.offsetHeight;
        console.log(width, height);
        html2canvas(myDiv).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                unit: "px",
                format: [width, height],
            });
            pdf.addImage(canvas, "JPEG", 0, 0, width, height);
            pdf.save(`${downloadFileName}.pdf`);
        });
    };

    return <span onClick={downloadPdfDocument}>{children}</span>;
};

export default GenericPdfDownloader;
