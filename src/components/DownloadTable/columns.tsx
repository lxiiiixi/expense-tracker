import type { ColumnsType } from "antd/es/table";
import { Item } from "../AccountTable/interface";
import { RowSpanData } from "../AccountTable/interface";

const columns: ColumnsType<Item> = [
    {
        title: "Time",
        dataIndex: "time",
        width: "15%",
        align: "center",
        onCell: (record: object) => {
            return {
                rowSpan: (record as RowSpanData).rowSpan,
            };
        },
    },
    {
        title: "Category",
        dataIndex: "category",
        align: "center",
    },
    {
        title: "Usage",
        dataIndex: "usage",
        align: "center",
    },
    {
        title: "Description",
        dataIndex: "description",
        align: "center",
    },
    {
        title: "Cost",
        dataIndex: "cost",
        align: "center",
    },
];

export default columns;
