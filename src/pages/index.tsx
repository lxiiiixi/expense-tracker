import { useState, useEffect } from "react";
import Head from "next/head";
import PageLayout from "@/components/PageLayout";
import { Row, Col, Card, Space, Input } from "antd";
import AccountTable from "@/components/AccountTable";
import { Item } from "@/components/AccountTable/interface";
import FullPie from "@/components/Echarts/PieChart";
import { getPieChart } from "@/utils/getCardFunc";
import { useConfigContext } from "@/context/config_provider";
import getDateFromData from "@/utils/getDateFromData";
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
    const { nowDate } = config;
    const [tableData, setTableData] = useState<Item[]>([]);
    const displayData = filterData(tableData, nowDate);
    const [firstEnter, setFirstEnter] = useState(false);

    const chanegeData = (newData: Item[]) => {
        console.log(newData);

        setTableData(newData);
    };

    useEffect(() => {
        const ExpenseTrackerData =
            JSON.parse(localStorage.getItem("ExpenseTrackerData") as string) || [];
        const { savedTableData, savedConfig } = ExpenseTrackerData;
        setTableData(savedTableData);
        changeConfig(savedConfig);
        setFirstEnter(true);
        console.log("Get saved data", ExpenseTrackerData);
    }, [changeConfig]);

    useEffect(() => {
        if (firstEnter) {
            // 每次tableData改变时检测一下有没有新的年月增加
            // const newConfig = { ...config, dates: getDateFromData(tableData) };
            // const saveData = { savedTableData: tableData, savedConfig: newConfig };
            // console.log("Update saved data", saveData);
            // localStorage.setItem("ExpenseTrackerData", JSON.stringify(saveData));
        }
    }, [tableData, firstEnter, config]);

    useEffect(() => {
        console.log(tableData, getDateFromData(tableData));
        changeConfig({ ...config, dates: getDateFromData(tableData) });
    }, [changeConfig, tableData]);

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
                                title="Mar."
                                tableData={displayData}
                                chanegeData={chanegeData}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} className="p-5 lg:p-0 lg:pl-10">
                        {/* <div className="h-auto w-full rounded-l-xl bg-white py-4 px-6 shadow-xl">
                            <h2 className="text-left">Cards</h2>
                            <div className="flex flex-col">
                                <Card className="my-2 shadow-sm hover:shadow-lg">
                                    <FullPie data={getPieChart(displayData)} />
                                </Card>
                                <Card className="my-2 shadow-sm hover:shadow-lg">
                                </Card>
                            </div>
                        </div> */}
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
                            <Card className="my-2 shadow-sm hover:shadow-lg">
                                <FullPie data={getPieChart(displayData)} />
                            </Card>
                            <Card className="my-2 shadow-sm hover:shadow-lg"></Card>
                        </Card>
                    </Col>
                </Row>
            </PageLayout>
        </>
    );
};

export default Index;
