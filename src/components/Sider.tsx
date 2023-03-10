import { Button, Space, Tooltip, Select, Dropdown } from "antd";
import { SearchOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useThemeContext, Theme } from "@/context/theme_provider";
import { useConfigContext } from "@/context/config_provider";
import type { MenuProps } from "antd";

const Sider = () => {
    const { changeTheme } = useThemeContext();
    const { config, changeConfig } = useConfigContext();
    const { dates, nowDate } = config;

    const onChange = (newValue: string) => {
        changeTheme(newValue as Theme);
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };

    const onClick: MenuProps["onClick"] = ({ key }) => {
        changeConfig({ ...config, nowDate: key });
    };
    const MenuItems: MenuProps["items"] = dates.map((item) => ({
        key: item,
        label: item,
    }));

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
            <Dropdown
                menu={{
                    items: MenuItems,
                    onClick,
                    selectable: true,
                    defaultSelectedKeys: [nowDate],
                }}
            >
                <Button>
                    <Space>
                        Switch Date <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
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
