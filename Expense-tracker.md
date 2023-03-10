## Todo

1. 改变字体/或者实现字体根据主题的切换
2. PageLayout 的基本样式设置
3. table 的展示
4. table 功能：模糊查询、根据某一项排序
5. 数据导出图片/pdf 样式的调整
6. 设置目标 超出警告
7. 颜色区分显示

## 项目初始化

```sh
$ npx create-next-app@latest --typescript
# 然后开始选择一些配置项
liuxi@liuxideMacBook-Pro Github % npx create-next-app@latest --typescript
✔ What is your project named? … expense-tracker
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
? Would you like to use experimental `app/` directory with this project? › No / ? Would you like to use experimental `app/` directory with this project? › No / ✔ Would you like to use experimental `app/` directory with this project? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /Users/liuxi/Desktop/Github/expense-tracker.

Using npm.

Installing dependencies:
- react
- react-dom
- next
- @next/font
- typescript
- @types/react
- @types/node
- @types/react-dom
- eslint
- eslint-config-next

added 270 packages in 4s
Initializing project with template: app
Initialized a git repository.
Success! Created expense-tracker at /Users/liuxi/Desktop/Github/expense-tracker
```

## 添加 tailwindcss 和 scss

删除不必要的初始化内容，本项目也不打算用模块样式

安装 tailwindcss 按照官网步骤来 https://tailwindcss.com/docs/installation/using-postcss
关于 tailwind 和 antd 的样式冲突解决：https://dev.to/fabiobiondi/react-antd-and-tailwind-fix-css-conflicts-5542

```js
// 注意config
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

安装 scss https://www.nextjs.cn/docs/basic-features/built-in-css-support#%E5%AF%B9-sass-%E7%9A%84%E6%94%AF%E6%8C%81

```sh
$ yarn add sass
```

> 疑问：withTM 的作用
>
> https://github.com/martpie/next-transpile-modules
>
> ```js
> /** @type {import('next').NextConfig} */
> const path = require("path");
> const withTM = require("next-transpile-modules")(["echarts", "zrender"]);
>
> const nextConfig = withTM({
>     reactStrictMode: true,
>     sassOptions: {
>         includePaths: [path.join(__dirname, "styles")],
>     },
> });
>
> module.exports = nextConfig;
> ```

## 使用 Antd5.0

https://ant.design/docs/react/use-in-typescript#import-antd

```sh
$ yarn add antd
```

## 主题的定制和切换

在 PageLayout 中使用 Antd 的主题方案实现主题切换

通过 Antd 的 ConfigProvider 和全局数据管理，配置到 pageLayout 上实现切换

tailwind 的基础预设样式会和 antd 的有冲突，需要在 globalcss 中加入对 `@tailwind base;` 的引入

## 对屏幕适配的调节工具

https://github.com/jorenvanhee/tailwindcss-debug-screens

## Tailwindcss+Prettier 自动格式化 class

Github：https://github.com/tailwindlabs/prettier-plugin-tailwindcss
Official：https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted

## Echarts 图表的使用

echarts-for-react：https://git.hust.cc/echarts-for-react/
但是要注意在 next.config.js 中加上一些配置：

```js
yarn add next-transpile-modules

/** @type {import('next').NextConfig} */
const path = require('path');
const withTM = require("next-transpile-modules")(["echarts", "zrender"]);

const nextConfig = withTM({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})
module.exports = nextConfig

并用withTM包裹导出的config 否则会报错如下：
error - /Users/liuxi/Desktop/Github/expense-tracker/node_modules/echarts/core.js:20
export * from './lib/export/core.js';
^^^^^^
SyntaxError: Unexpected token 'export'
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1026:15)
    at Module._compile (node:internal/modules/cjs/loader:1061:27)
```
