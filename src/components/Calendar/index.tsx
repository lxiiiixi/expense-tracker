import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { Calendar, Col, Radio, Row, Select, Typography, theme, Tag } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
dayjs.extend(dayLocaleData);

const CalendarChart = () => {
    const { token } = theme.useToken();

    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const getListData = (value: Dayjs) => {
        let listData;
        switch (value.date()) {
            case 9:
                listData = [{ type: "warning", content: "" }];
                break;
            case 8:
                listData = [{ type: "warning", content: "12" }];
                break;
            case 10:
                listData = [{ type: "success", content: "100" }];
                break;
            case 15:
                listData = [{ type: "error", content: "1289" }];
                break;
            default:
                listData = [{ type: "warning", content: "" }];
        }
        return listData || [];
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
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            // <ul className="events">
            //     {listData.map((item) => (
            //         <li key={item.content}>{item.content}</li>
            //     ))}
            // </ul>
            <>
                {listData.map((item) => (
                    <Tag color="gold" key={item.content}>
                        {item.content}
                    </Tag>
                ))}
            </>
        );
    };

    return (
        <div style={wrapperStyle}>
            <Calendar
                style={{ width: "100%" }}
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
                            <Typography.Title level={4}>Custom header</Typography.Title>
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
