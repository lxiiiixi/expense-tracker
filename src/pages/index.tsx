import { useState, useEffect } from "react";
import Head from "next/head";
import PageLayout from "@/components/PageLayout";
import { Row, Col, Card, Space, Input } from "antd";
import AccountTable from "@/components/AccountTable";
import { Item } from "@/components/AccountTable/interface";
import FullPie from "@/components/Echarts/PieChart";
import CalendarChart from "@/components/Calendar";
import { getPieChart } from "@/utils/getCardFunc";
import { useConfigContext } from "@/context/config_provider";
import { useDataContext } from "@/context/data_provider";
import transTime from "@/utils/transTime";
import getDateFromData from "@/utils/getDateFromData";
import { getCalendarFunc } from "@/utils/getCalendarFunc";

// import Sider from "@/components/Sider";
// import demoData from "../../demoData.js";
// const originAllData: Item[] = demoData;

const filterData = (originData: Item[], nowDisplay: string) => {
    return originData.filter((item) => {
        const [y, m, d] = item.time.split("-");
        return `${y}-${m}` === nowDisplay;
    });
};

const Index = () => {
    // const [nowDisplay, setNowDisplay] = useState(getYearAndMon(new Date().getTime()));
    // const [tableData, setTableData] = useState<Item[]>(originAllData);
    const { config, changeConfig } = useConfigContext();
    const { wholeData, changeWholeData } = useDataContext();
    const { nowDate } = config;
    const displayData = filterData(wholeData, nowDate); // display data
    const [firstEnter, setFirstEnter] = useState(false);
    // 用这个记录是因为一个bug 但是又引发出来一个新的bug 就是第一次进入的页面永远也不会存数据

    const chanegeData = (newData: Item[]) => {
        changeWholeData(newData);
    };

    useEffect(() => {
        const ExpenseTrackerData = JSON.parse(localStorage.getItem("ExpenseTrackerData") as string);

        // 如果不做判断的话获取不到数据 后续会报错
        if (ExpenseTrackerData) {
            const { savedTableData, savedConfig } = ExpenseTrackerData;
            changeWholeData(savedTableData);
            changeConfig(savedConfig);
            setFirstEnter(true);
            console.log("Get saved data", ExpenseTrackerData);
        }
    }, [changeConfig, changeWholeData]);

    useEffect(() => {
        if (firstEnter) {
            // 每次tableData改变时检测一下有没有新的年月增加
            const newConfig = { ...config, dates: getDateFromData(wholeData) };
            const saveData = { savedTableData: wholeData, savedConfig: newConfig };
            console.log("Update saved data", saveData);
            localStorage.setItem("ExpenseTrackerData", JSON.stringify(saveData));
        }
    }, [wholeData, firstEnter, config]);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <div className="mx-5 lg:mx-0 lg:ml-10">
                            <AccountTable
                                title={transTime(nowDate)}
                                tableData={wholeData}
                                displayData={displayData}
                                chanegeData={chanegeData}
                                // tableData={displayData}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} className="p-5 lg:p-0 lg:pl-10">
                        <Card
                            title={<div className="text-left">Card</div>}
                            className="rounded-3xl lg:rounded-none lg:rounded-l-3xl"
                            extra={
                                <Input
                                    placeholder="Search"
                                    allowClear
                                    onChange={(e) => {
                                        // setSearchValue(e.target.value);
                                    }}
                                />
                            }
                        >
                            <Space direction="vertical" size="large">
                                <Card className="shadow-sm hover:shadow-lg">
                                    <FullPie data={getPieChart(displayData)} />
                                </Card>
                                <Card className="p-0 shadow-sm hover:shadow-lg">
                                    <CalendarChart
                                        data={getCalendarFunc(displayData)}
                                        date={nowDate}
                                    />
                                </Card>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </PageLayout>
        </>
    );
};

export default Index;
