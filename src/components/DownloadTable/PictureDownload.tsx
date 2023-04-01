import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as FileSaver from "file-saver";

const PictureDownload = ({
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
        html2canvas(myDiv).then((canvas) => {
            canvas.toBlob((blob) => {
                // 将 Canvas 对象转换为 Blob 对象
                FileSaver.saveAs(blob as Blob, `${downloadFileName}.jpeg`); // 将 Blob 对象保存为图片文件
            }, "image/png");
        });
    };

    return <span onClick={downloadPdfDocument}>{children}</span>;
};

export default PictureDownload;
