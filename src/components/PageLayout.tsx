// import { useState } from 'react'
import { ConfigProvider, theme, Select } from 'antd';
import { useThemeContext, Theme } from '@/context/theme_provider';
// import Footer from "./Footer";

const theme1 = {
    algorithm: theme.darkAlgorithm,
}
const theme2 = {
    algorithm: theme.compactAlgorithm,
}

const PageLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    const { theme, changeTheme } = useThemeContext()

    const onChange = (newValue: string) => {
        changeTheme(newValue as Theme)
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };



    return (
        <ConfigProvider
            theme={theme === "dark" ? theme1 : theme2}
        >
            <div>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: 'dark',
                            label: 'dark',
                        },
                        {
                            value: 'light',
                            label: 'light',
                        },
                    ]}
                />
                {children}
                {/* <Footer /> */}
            </div>
        </ConfigProvider>
    );
}

export default PageLayout;