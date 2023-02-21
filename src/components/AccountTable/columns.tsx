import { Popconfirm, Typography, Space } from "antd";
import { RowSpanData, Item } from "./interface";

export default function getColumns(
    editingKey: string,
    save: (key: React.Key) => void,
    cancel: () => void,
    editItem: (record: Partial<Item> & { key: React.Key }) => void,
    deleteItem: (record: Partial<Item> & { key: React.Key }) => void,
    categoryList: string[]
) {
    const isEditing = (record: Item) => record.key === editingKey;

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
            title: "price",
            dataIndex: "price",
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

    // 为设置了 editable 的项加上 onCell 属性
    const getMergedColumns = () => {
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
