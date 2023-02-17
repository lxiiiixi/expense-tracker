import React, { useState, useEffect } from "react";
import { ConfigProvider, Layout } from "antd";
import { useThemeContext, Theme } from "@/context/theme_provider";
import { pinkTheme, blackTheme } from "@/styles/theme";
import Sider from "./Sider";
// import Footer from "./Footer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useThemeContext();

    const getThemeConfig = (str: Theme) => {
        switch (str) {
            case "blackTheme":
                return blackTheme;
            case "pinkTheme":
            case "defaultTheme":
            default:
                return pinkTheme;
        }
    };

    return (
        <ConfigProvider theme={getThemeConfig(theme)}>
            <Layout>
                <Layout.Sider className="h-screen text-center">
                    <Sider />
                </Layout.Sider>
                <Layout>
                    <Layout.Content className="min-h-screen overflow-y-scroll text-center">
                        <div>{children}</div>
                        {/* <Footer /> */}
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default PageLayout;
