import { useState, useEffect } from "react";
import Head from "next/head";
// import Image from 'next/image'
import PageLayout from "@/components/PageLayout";
import { Button, Form, Input, Popconfirm, Table, Typography, Select } from "antd";
import demoData from "../../demoData";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import AccountTable from "@/components/AccountTable";
interface Item {
    key: string;
    time: string;
    category: string;
    cost: number;
    description: string;
}
// 时间 项目(选择) 说明

interface RowSpanData extends Item {
    rowSpan: number;
}

const originData: Item[] = demoData;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "select" | "text";
    record: Item;
    index: number;
    category: string[];
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    inputType,
    children,
    category,
    ...restProps
}) => {
    const inputNode =
        inputType === "select" ? (
            <Select>
                {/*  */}
                {category.map((item) => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
        ) : (
            <Input />
        );
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const defaultDate = dayjs(dayjs(new Date()).format("YYYY-MM-DD")); // dayjs([]) returns the current time.

export default function Home() {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState("");
    const [addDate, setAddDate] = useState(defaultDate.format("YYYY-MM-DD"));
    const [category, setCategory] = useState<string[]>(["life", "traffic"]);

    dayjs.extend(customParseFormat);

    const isEditing = (record: Item) => record.key === editingKey;

    const editItem = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };

    const deleteItem = (record: Partial<Item> & { key: React.Key }) => {
        setData(data.filter((item) => item.key !== record.key));
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "time",
            dataIndex: "time",
            width: "20%",
            editable: false,
            align: "center" as "center",
            onCell: (record: RowSpanData) => {
                return {
                    rowSpan: record.rowSpan,
                };
            },
        },
        {
            title: "category",
            dataIndex: "category",
            width: "20%",
            align: "center" as "center",
            editable: true,
        },
        {
            title: "description",
            dataIndex: "description",
            width: "30%",
            align: "center" as "center",
            editable: true,
        },
        {
            title: "cost",
            dataIndex: "cost",
            width: "15%",
            align: "center" as "center",
            editable: true,
        },
        {
            title: "operation",
            dataIndex: "operation",
            align: "center" as "center",
            render: (_: any, record: RowSpanData) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Typography.Link onClick={() => save(record.key)}>Save</Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => editItem(record)}
                        >
                            Edit
                        </Typography.Link>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => deleteItem(record)}
                        >
                            Delete
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === "category" ? "select" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                category,
            }),
        };
    });

    const addRow = () => {
        const newKey = new Date().getTime().toString();

        const obj = {
            key: newKey,
            cost: 0,
            description: "",
            time: addDate,
            category: category[0],
        };
        setData([...data, obj]);
        setEditingKey(newKey);
    };

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        setAddDate(dateString);
    };

    // sort by time => get RowSpanData[]
    const getRowSpanData = (arr: Item[]): RowSpanData[] => {
        let names: Array<string> = [];
        return arr
            .sort((item1, item2) => new Date(item1.time).getTime() - new Date(item2.time).getTime())
            .map((element) => {
                if (names.includes(element.time)) {
                    return { ...element, rowSpan: 0 };
                } else {
                    const num = arr.filter((item) => item.time === element.time).length;
                    names.push(element.time);
                    return { ...element, rowSpan: num };
                }
            });
    };

    console.log(mergedColumns);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <div className=" mt-20">
                    <Form form={form} component={false}>
                        {/* <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={getRowSpanData(data)}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            // pagination={{
                            //     onChange: cancel,
                            // }}
                            pagination={false}
                            className="margin-center w-4/5"
                            size="small"
                            footer={() => {
                                return (
                                    <TableFooter
                                        onChange={onChange}
                                        addRow={addRow}
                                        defaultDate={defaultDate}
                                    />
                                );
                            }}
                        /> */}
                    </Form>
                </div>
                <AccountTable />
            </PageLayout>
        </>
    );
}

const TableFooter = ({
    onChange,
    addRow,
    defaultDate,
}: {
    onChange: DatePickerProps["onChange"];
    addRow: () => void;
    defaultDate: any;
}) => {
    return (
        <Space className="flex justify-start">
            <DatePicker onChange={onChange} defaultValue={defaultDate} format={"YYYY-MM-DD"} />
            <Button onClick={addRow}>Add</Button>
        </Space>
    );
};
