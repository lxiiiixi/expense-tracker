import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDataContext } from "@/context/data_provider";
import { useConfigContext } from "@/context/config_provider";
import FullPie from "@/components/Echarts/PieChart";
import { getPieChart } from "@/utils/getCardFunc";
import CalendarChart from "@/components/Calendar";
import { getCalendarFunc } from "@/utils/getCalendarFunc";
import DownloadTable from "@/components/DownloadTable";
import getRowSpanData from "@/utils/getRowSpanData";
import GenericPdfDownloader from "@/components/DownloadTable/GenericPdfDownloader";
import PictureDownload from "@/components/DownloadTable/PictureDownload";

import { Button, Tooltip, Space, Card } from "antd";
import { FilePdfOutlined, FileImageOutlined, DownloadOutlined } from "@ant-design/icons";

import { Item } from "@/components/AccountTable/interface";
import type { MenuProps } from "antd";

function getNowDataByTime(time: string, wholeData: Item[]) {
    let nowData: Item[] = [];
    wholeData.forEach((item) => {
        const yearAndMonth = item.time.split("-")[0] + "-" + item.time.split("-")[1];
        if (yearAndMonth === time) {
            nowData.push(item);
        }
    });
    return nowData;
}

function Download() {
    const router = useRouter();
    const { time } = router.query;
    const { wholeData } = useDataContext();
    const { config, changeConfig } = useConfigContext();
    const { dates, nowDate } = config;

    const [downloadData, setDownloadData] = useState<Item[]>(
        getNowDataByTime(time as string, wholeData)
    );

    console.log(downloadData);

    return (
        <div className="p-4">
            <Space className="flex justify-center">
                <Button onClick={() => router.push("/")}>Back</Button>
                <GenericPdfDownloader
                    downloadFileName={(time as string) + " Expense"}
                    rootElementId="downloadId"
                >
                    <Tooltip title="Download as pdf" placement="bottom">
                        <Button>
                            <DownloadOutlined />
                            <FilePdfOutlined />
                        </Button>
                    </Tooltip>
                </GenericPdfDownloader>
                <PictureDownload
                    downloadFileName={(time as string) + " Expense"}
                    rootElementId="downloadId"
                >
                    <Tooltip title="Download as image" placement="bottom">
                        <Button>
                            <DownloadOutlined />
                            <FileImageOutlined />
                        </Button>
                    </Tooltip>
                </PictureDownload>
            </Space>
            <div id="downloadId" className="m-4">
                <Card className="shadow-sm hover:shadow-lg">
                    <DownloadTable data={getRowSpanData(downloadData)} />
                    <div className="mt-6 flex items-center justify-evenly">
                        <FullPie data={getPieChart(downloadData)} lableIncludeNum />
                        <CalendarChart data={getCalendarFunc(downloadData)} date={time as string} />
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Download;
