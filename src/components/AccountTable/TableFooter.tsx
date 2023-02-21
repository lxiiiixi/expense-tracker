import type { DatePickerProps } from "antd";
import { DatePicker, Space, Button } from "antd";

const TableFooter = ({
    onChange,
    addRow,
    defaultDate,
}: {
    onChange: DatePickerProps["onChange"];
    addRow: () => void;
    defaultDate: any;
}) => {
    return (
        <Space className="flex justify-start">
            <DatePicker onChange={onChange} defaultValue={defaultDate} format={"YYYY-MM-DD"} />
            <Button onClick={addRow}>Add</Button>
        </Space>
    );
};

export default TableFooter;
