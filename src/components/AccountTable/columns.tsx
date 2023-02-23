import { Popconfirm, Typography, Space, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { RowSpanData, Item, EditableCellProps } from "./interface";
import type { ColumnType } from "antd/es/table";

export default function getColumns(
    editingKey: string,
    save: (key: React.Key) => void,
    cancel: () => void,
    editItem: (record: Partial<Item> & { key: React.Key }) => void,
    deleteItem: (record: Partial<Item> & { key: React.Key }) => void,
    categoryList: string[]
) {
    const isEditing = (record: Item) => record.key === editingKey;

    const columns: ColumnType<> = [
        {
            title: "Time",
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
            title: (
                <span>
                    Category
                    <span className="ml-1 text-xs font-light">
                        <FormOutlined />
                    </span>
                </span>
            ),
            // title: "Category",
            dataIndex: "category",
            width: "20%",
            align: "center" as "center",
            editable: true,
        },
        {
            title: "Description",
            dataIndex: "description",
            width: "30%",
            align: "center" as "center",
            editable: true,
        },
        {
            title: "Cost",
            dataIndex: "cost",
            width: "15%",
            align: "center" as "center",
            editable: true,
        },
        {
            title: "Operation",
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
                        <Button type="primary" onClick={() => editItem(record)}>
                            Edit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record)}>
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    // 为设置了 editable 的项加上 onCell 属性
    const getMergedColumns = function () {
        return columns.map((col) => {
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
                    categoryList,
                }),
            };
        });
    };

    return getMergedColumns();
}

export const dynamicColoumns = [{ name: "description", type: "Input" }];
