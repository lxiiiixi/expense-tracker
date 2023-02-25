import { Form, Input, Select } from "antd";
import { EditableCellProps } from "./interface";

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
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
                <Form.Item
                    name={dataIndex}
                    rules={
                        dataIndex === "cost" || dataIndex === "category"
                            ? [
                                  { required: true, message: `Input the ${dataIndex}!` },
                                  dataIndex === "cost"
                                      ? ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                // !""===true
                                                if (!isNaN(Number(value))) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Input A Number!"));
                                            },
                                        })
                                      : {},
                              ]
                            : [{ required: false }]
                    }
                    style={{ margin: 0 }}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
export default EditableCell;
