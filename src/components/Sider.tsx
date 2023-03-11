import { Button, Space, Tooltip, Select, Dropdown } from "antd";
import { ArrowDownOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useThemeContext, Theme } from "@/context/theme_provider";
import { useConfigContext } from "@/context/config_provider";
import { useDataContext } from "@/context/data_provider";
import { switchDate } from "@/utils/switchTime";
import type { MenuProps } from "antd";

const Sider = () => {
    const { changeTheme } = useThemeContext();
    const { config, changeConfig } = useConfigContext();
    const { wholeData } = useDataContext();
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

    // function downloadFile(content, filename = "labelsCloud.json") {
    //     var blob = new Blob([content], { type: "text/json;charset=UTF-8" });
    //     var url = window.URL.createObjectURL(blob);
    //     chrome.downloads.download({
    //        url: url,
    //        filename: filename
    //     })
    //  }
    const handleDownload = () => {
        console.log(wholeData);
        const blob = new Blob([JSON.stringify(wholeData)], { type: "text/json;charset=UTF-8" }); // 创建新的 Blob 对象
        const url = URL.createObjectURL(blob); // 创建 URL 对象
        const link = document.createElement("a"); // 创建隐藏的下载链接并点击
        link.href = url;
        link.download = `${switchDate(new Date().getTime())}.json`;
        link.click();
        URL.revokeObjectURL(url);
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
                        {nowDate} <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            <Tooltip title="Download All Data" placement="bottom">
                <Button onClick={handleDownload} shape="circle" icon={<ArrowDownOutlined />} />
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
