import type { DatePickerProps } from "antd";
import { DatePicker, Space, Button } from "antd";

const TableFooter = ({
    onChange,
    addRow,
    defaultDate,
    totalData,
}: {
    onChange: DatePickerProps["onChange"];
    addRow: () => void;
    defaultDate: any;
    totalData: number;
}) => {
    return (
        <div className="flex justify-between">
            <Space className="flex justify-start">
                <DatePicker onChange={onChange} defaultValue={defaultDate} format={"YYYY-MM-DD"} />
                <Button onClick={addRow}>Add</Button>
            </Space>
            <Space>
                <span>
                    Total:<span className=" mx-2 text-xl text-red-500">{totalData}</span>
                </span>
            </Space>
        </div>
    );
};

export default TableFooter;
