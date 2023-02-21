import { Form, Input, Select } from "antd";
import { EditableCellProps } from "./interface";

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    inputType,
    children,
    categoryList,
    ...restProps
}) => {
    const inputNode =
        inputType === "select" ? (
            <Select>
                {categoryList.map((item) => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
        ) : (
            <Input />
        );
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
export default EditableCell;
