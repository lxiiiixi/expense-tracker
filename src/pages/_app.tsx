import type { AppProps } from "next/app";
import React from "react";
import ThemeProvider from "@/context/theme_provider";
import ConfigProvider from "@/context/config_provider";
import DataProvider from "@/context/data_provider";
import "antd/dist/reset.css";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <DataProvider>
                <ConfigProvider>
                    <Component {...pageProps} />
                </ConfigProvider>
            </DataProvider>
        </ThemeProvider>
    );
}
