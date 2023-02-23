import { useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Typography, Select, Card } from "antd";
import demoData from "../../../demoData";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Item, RowSpanData } from "./interface";
import EditableCell from "./EditableCell";
import TableFooter from "./TableFooter";
import getColumns from "./columns";

const originData: Item[] = demoData;
const defaultDate = dayjs(dayjs(new Date()).format("YYYY-MM-DD")); // dayjs([]) returns the current time.

export default function AccountTable() {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState("");
    const [addDate, setAddDate] = useState(defaultDate.format("YYYY-MM-DD"));
    const [categoryList, setCategoryList] = useState<string[]>(["life", "traffic"]);

    dayjs.extend(customParseFormat);

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

    const addRow = () => {
        const newKey = new Date().getTime().toString();

        const obj = {
            key: newKey,
            price: 0,
            description: "",
            time: addDate,
            category: categoryList[0],
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

    const handleSearch = () => {};

    const mergedColumns = getColumns(editingKey, save, cancel, editItem, deleteItem, categoryList);

    return (
        <Card
            title={
                <div className="text-left">
                    <span className="text-2xl">Jan.</span> <span className="text-sm">2023</span>
                </div>
            }
            extra={
                <div>
                    {" "}
                    <Input placeholder="Search" allowClear onChange={handleSearch} />
                </div>
            }
            style={{ padding: 0 }}
        >
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    // bordered
                    dataSource={getRowSpanData(data)}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    // pagination={{
                    //     onChange: cancel,
                    // }}
                    pagination={false}
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
                />
            </Form>
        </Card>
    );
}
