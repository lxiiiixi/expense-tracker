import { Popconfirm, Typography, Space, Button, Table, Popover, Select } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { RowSpanData, Item } from "./interface";
import { Config } from "@/context/config_provider";
import type { SelectProps } from "antd";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
type ExtendColumnTypes = {
    editable?: boolean;
    dataIndex: string;
};

export default function getColumns(
    editingKey: string,
    save: (key: React.Key) => void,
    cancel: () => void,
    editItem: (record: Partial<Item> & { key: React.Key }) => void,
    deleteItem: (record: Partial<Item> & { key: React.Key }) => void,
    config: Config,
    changeConfig: (config: Config) => void
) {
    const categoryList = config.category;
    const isEditing = (record: Item) => record.key === editingKey;
    let newCategory: string[] = [];
    const handleEditCategory = (value: string[]) => {
        newCategory = value;
    };

    const handleCategory = () => {
        changeConfig({ ...config, category: newCategory });
    };

    const defaultOptions: SelectProps["options"] = [
        {
            value: "Life",
            label: "Life",
        },
        {
            value: "Traffic",
            label: "Traffic",
        },
    ];

    const editCategoryContent = (
        <>
            <Select
                mode="tags"
                className="p-2"
                size="large"
                style={{ minWidth: "260px" }}
                placeholder="Input a category and enter"
                onChange={handleEditCategory}
                options={defaultOptions}
                defaultValue={categoryList}
            />
            <Button size="large" onClick={handleCategory}>
                Confirm
            </Button>
        </>
    );

    const columns: (ColumnTypes[number] & ExtendColumnTypes)[] = [
        {
            title: "Time",
            dataIndex: "time",
            width: "20%",
            editable: false,
            align: "center" as "center",
            onCell: (record: object) => {
                return {
                    rowSpan: (record as RowSpanData).rowSpan,
                };
            },
        },
        {
            title: (
                <span>
                    Category
                    <Popover
                        className="ml-1 text-xs font-light"
                        placement="top"
                        content={editCategoryContent}
                        trigger="click"
                    >
                        <FormOutlined />
                    </Popover>
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
            render: (_: any, record: object) => {
                const recordItem = record as Item;
                const editable = isEditing(recordItem);
                return editable ? (
                    <Space>
                        <Typography.Link onClick={() => save(recordItem.key)}>Save</Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space>
                        <Button type="primary" onClick={() => editItem(recordItem)}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => deleteItem(recordItem)}
                        >
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    // 为设置了 editable 的项加上 onCell 属性
    const getMergedColumns: any = function () {
        return columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record: RowSpanData) => ({
                    record,
                    inputType: col.dataIndex === "category" ? "select" : "text",
                    dataIndex: col.dataIndex,
                    // title: col.title,
                    editing: isEditing(record),
                    categoryList,
                }),
            };
        });
    };

    return getMergedColumns();
}

export const dynamicColoumns = [{ name: "description", type: "Input" }];
