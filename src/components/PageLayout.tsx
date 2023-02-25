import React, { useState, useEffect } from "react";
import { ConfigProvider, Layout } from "antd";
import { useThemeContext, Theme } from "@/context/theme_provider";
import { pinkTheme, blackTheme } from "@/styles/theme";
import Sider from "./Sider";
import Footer from "./Footer";

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
                {/* <Layout.Sider
                    width={180}
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: "#f1f8ff",
                    }}
                >
                    <Sider />
                </Layout.Sider>
                <Layout style={{ marginLeft: 180, background: "#f1f8ff" }}>
                    <Layout.Content className="min-h-screen overflow-scroll text-center">
                        <div>{children}</div>
                        <Footer />
                    </Layout.Content>
                </Layout> */}
                <Layout style={{ background: "#f1f8ff", minHeight: "100vh" }}>
                    <Layout.Content>
                        <div
                            style={{ background: "#f1f8ff", minHeight: "97vh" }}
                            className="overflow-scroll text-center"
                        >
                            <Sider />
                            {children}
                        </div>
                        <Footer />
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default PageLayout;
