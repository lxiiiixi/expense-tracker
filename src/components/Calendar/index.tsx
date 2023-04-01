import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { Calendar, Col, Radio, Row, Select, Typography, theme, Tag } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
dayjs.extend(dayLocaleData);

const CalendarChart = ({
    data,
    date,
}: {
    data: { cost: number; time: string }[];
    date: string;
}) => {
    const [levelNum, setLevelNum] = useState(200);
    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const ifNowMonth = value.get("month") + 1 === Number(date?.split("-")[1]);
        let itemData = data.filter(
            (element) => Number(element.time.split("-")[2]) === value.date()
        )[0];
        let tagColor = "gold";
        // console.log(value.get("month"), Number(date.split("-")[1]));

        if (itemData?.cost >= levelNum) {
            tagColor = "red";
        }

        return (
            <>
                {itemData && ifNowMonth && (
                    <Tag className="mt-1 w-full text-center" color={tagColor}>
                        {itemData.cost}
                    </Tag>
                )}
                {!itemData && ifNowMonth && (
                    <Tag className="mt-1 w-full text-center" color="green">
                        0
                    </Tag>
                )}
            </>
        );
    };

    return (
        <div style={{ width: "100%", borderRadius: "8px" }}>
            <Calendar
                fullscreen={false}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    let current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current = current.month(i);
                        months.push(localeData.monthsShort(current));
                    }

                    for (let i = start; i < end; i++) {
                        monthOptions.push(
                            <Select.Option key={i} value={i} className="month-item">
                                {months[i]}
                            </Select.Option>
                        );
                    }

                    const year = value.year();
                    const month = value.month();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option key={i} value={i} className="year-item">
                                {i}
                            </Select.Option>
                        );
                    }
                    return (
                        <div style={{ padding: 8 }}>
                            <Row gutter={8}>
                                <Col>
                                    <Radio.Group
                                        size="small"
                                        onChange={(e) => onTypeChange(e.target.value)}
                                        value={type}
                                    >
                                        <Radio.Button value="month">Month</Radio.Button>
                                        <Radio.Button value="year">Year</Radio.Button>
                                    </Radio.Group>
                                </Col>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        className="my-year-select"
                                        value={year}
                                        onChange={(newYear) => {
                                            const now = value.clone().year(newYear);
                                            onChange(now);
                                        }}
                                    >
                                        {options}
                                    </Select>
                                </Col>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        value={month}
                                        onChange={(newMonth) => {
                                            const now = value.clone().month(newMonth);
                                            onChange(now);
                                        }}
                                    >
                                        {monthOptions}
                                    </Select>
                                </Col>
                                <Col>
                                    <Tag color="red">{levelNum}</Tag>
                                </Col>
                            </Row>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
            />
        </div>
    );
};

export default CalendarChart;
