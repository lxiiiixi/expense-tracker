import { Html, Head, Main, NextScript } from "next/document";

const env = process.env.NODE_ENV;
// development 开发环境
// production 生产环境

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={env === "development" ? "debug-screens" : ""}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
