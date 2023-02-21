export interface Item {
    key: string;
    time: string;
    category: string;
    price: number;
    description: string;
}
// 时间 项目(选择) 说明

export interface RowSpanData extends Item {
    rowSpan: number;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "select" | "text";
    record: Item;
    index: number;
    categoryList: string[];
    children: React.ReactNode;
}
