import { useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Typography, Select, Card, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Item, RowSpanData, AccountTableProps } from "./interface";
import EditableCell from "./EditableCell";
import TableFooter from "./TableFooter";
import getColumns from "./columns";

const defaultDate = dayjs(dayjs(new Date()).format("YYYY-MM-DD")); // dayjs([]) returns the current time.

export default function AccountTable({ tableData, title, chanegeData }: AccountTableProps) {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [addDate, setAddDate] = useState(defaultDate.format("YYYY-MM-DD")); // DataPicker的时间值
    const [categoryList, setCategoryList] = useState<string[]>(["life", "traffic", "save"]);
    const [searchValue, setSearchValue] = useState("");
    const [selectCategory, setSelectCategory] = useState("All");

    dayjs.extend(customParseFormat);

    const editItem = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };

    const deleteItem = (record: Partial<Item> & { key: React.Key }) => {
        chanegeData(tableData.filter((item) => item.key !== record.key));
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...tableData];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                chanegeData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                chanegeData(newData);
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
            cost: 0,
            description: "",
            time: addDate,
            category: categoryList[0],
        };
        chanegeData([...tableData, obj]);
        setEditingKey(newKey);
    };

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        setAddDate(dateString);
    };

    // sort by time => get RowSpanData[]
    // 先按照时间排序 => 获得增加了Row属性的对象数字(用于时间列的合并)
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

    const handleSearch = (seachValue: string, selectValue: string, tableData: Item[]) => {
        const filteredData = tableData.filter((value) => {
            return (
                value.time.toLowerCase().includes(seachValue.toLowerCase()) ||
                value.category.toLowerCase().includes(seachValue.toLowerCase()) ||
                value.cost.toString().toLowerCase().includes(seachValue.toLowerCase()) ||
                value.description.toString().toLowerCase().includes(seachValue.toLowerCase())
            );
        });
        if (selectValue === "All") {
            return filteredData;
        } else {
            return filteredData.filter(
                (item) => item.category.toLowerCase() === selectValue.toLowerCase()
            );
        }
    };

    const mergedColumns = getColumns(editingKey, save, cancel, editItem, deleteItem, categoryList);
    const totalData = handleSearch(searchValue, selectCategory, getRowSpanData(tableData))
        .map((item) => item.cost)
        .reduce((cost1, cost2) => cost1 + cost2);

    return (
        <Card
            title={
                <div className="text-left">
                    <span className="text-2xl">{title}</span> <span className="text-sm">2023</span>
                </div>
            }
            extra={
                <Space className="flex">
                    <Select
                        placeholder="Category"
                        style={{ width: 120 }}
                        onChange={(value) => {
                            setSelectCategory(value);
                        }}
                        options={[
                            { value: "All", label: "All" },
                            ...categoryList.map((item) => ({
                                value: item,
                                label: item,
                            })),
                        ]}
                    />
                    <Input
                        placeholder="Search"
                        allowClear
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                </Space>
            }
        >
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    // bordered
                    // pagination={{
                    //     onChange: cancel,
                    // }}
                    dataSource={handleSearch(
                        searchValue,
                        selectCategory,
                        getRowSpanData(tableData)
                    )}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    size="small"
                    footer={() => {
                        return (
                            <TableFooter
                                onChange={onChange}
                                addRow={addRow}
                                defaultDate={defaultDate}
                                totalData={totalData}
                            />
                        );
                    }}
                />
            </Form>
        </Card>
    );
}
