import React from "react";
import { Item } from "../AccountTable/interface";
import { Space, Table, Tag } from "antd";
import columns from "./columns";

function DownloadTable({ data }: { data: Item[] }) {
    return <Table columns={columns} dataSource={data} pagination={false} />;
}

export default DownloadTable;
