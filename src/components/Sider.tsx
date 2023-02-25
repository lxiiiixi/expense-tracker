import { Button, Space, Tooltip, Select } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useThemeContext, Theme } from "@/context/theme_provider";

const Sider = () => {
    const { changeTheme } = useThemeContext();

    const onChange = (newValue: string) => {
        changeTheme(newValue as Theme);
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };

    return (
        <Space className="bg-slate-400 flex justify-center py-5" size={20}>
            <div>
                <Select
                    showSearch
                    placeholder="Select a theme"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={themeOption}
                />
            </div>

            <Tooltip title="search" placement="rightTop">
                <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Tooltip title="Add" placement="rightTop">
                <Button shape="circle" icon={<PlusOutlined />} />
            </Tooltip>
        </Space>
    );
};

export default Sider;

const themeOption = [
    {
        value: "pinkTheme",
        label: "pink",
    },
    {
        value: "blackTheme",
        label: "black",
    },
    {
        value: "defaultTheme",
        label: "default",
    },
];
