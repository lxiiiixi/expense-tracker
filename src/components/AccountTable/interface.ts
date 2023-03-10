export interface Item {
    key: string;
    time: string;
    category: string;
    cost: number;
    usage: string;
    description: string;
}
// 时间 项目(选择) 说明

export interface RowSpanData extends Item {
    rowSpan: number;
}

// export interface ColumnItemType {
//     title: string | React.ReactNode;
//     dataIndex: string;
//     width: string;
//     editable: boolean;
//     align: string;
//     onCell: () => {};
// }

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    inputType: "select" | "text";
    record: Item;
    index: number;
    categoryList: string[];
    children: React.ReactNode;
}

export interface AccountTableProps {
    title: React.ReactNode;
    tableData: Item[];
    chanegeData: (newData: Item[]) => void;
}
