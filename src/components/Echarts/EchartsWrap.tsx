/**
 * echartsWarp.jsx
 *
 * @Author: shuyao
 * @Date: 2022/02/23
 */

import React from "react";
import ReactEchartsCore from "echarts-for-react/lib/core";
import { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts/core";
import "echarts/lib/component/dataZoom";

import {
    LineChart,
    BarChart,
    PieChart,
    // ScatterChart,
    // RadarChart,
    // MapChart,
    // TreeChart,
    // TreemapChart,
    GraphChart,
    // GaugeChart,
    // FunnelChart,
    // ParallelChart,
    // SankeyChart,
    // BoxplotChart,
    CandlestickChart,
    // EffectScatterChart,
    LinesChart,
    // HeatmapChart,
    // PictorialBarChart,
    // ThemeRiverChart,
    // SunburstChart,
    // CustomChart,
} from "echarts/charts";
// import components, all suffixed with Component
import {
    // GridSimpleComponent,
    GridComponent,
    // PolarComponent,
    // RadarComponent,
    // GeoComponent,
    // SingleAxisComponent,
    // ParallelComponent,
    CalendarComponent,
    GraphicComponent,
    ToolboxComponent,
    TooltipComponent,
    // AxisPointerComponent,
    // BrushComponent,
    TitleComponent,
    // TimelineComponent,
    // MarkPointComponent,
    // MarkLineComponent,
    // MarkAreaComponent,
    LegendComponent,
    LegendScrollComponent,
    // LegendPlainComponent,
    // DataZoomComponent,
    // DataZoomInsideComponent,
    DataZoomSliderComponent,
    // VisualMapComponent,
    // VisualMapContinuousComponent,
    // VisualMapPiecewiseComponent,
    // AriaComponent,
    // TransformComponent,
    DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
    // SVGRenderer,
} from "echarts/renderers";

// Register the required components
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
    PieChart,
    LegendComponent,
    DatasetComponent,
    TooltipComponent,
    ToolboxComponent,
    LinesChart,
    LineChart,
    GraphChart,
    CalendarComponent,
    GraphicComponent,
    LegendScrollComponent,
    CandlestickChart,
    DataZoomSliderComponent,
]);

import theme from "./theme";
echarts.registerTheme("shine", theme);

/**
 * props 属性：
 * option {object}    https://echarts.apache.org/zh/builder.html
 * notMerge {boolean}
 * lazyUpdate {object}
 * style {object}
 * className {string}
 *
 * 详细API：
 * http://echarts.baidu.com/api.html#echartsInstance.setOption
 * 相关资料：
 * https://github.com/hustcc/echarts-for-react#3-component-props
 *
 * */

// https://www.npmjs.com/package/echarts-for-react
const ReactEcharts = (props: EChartsReactProps) => {
    const { ...other } = props;
    return <ReactEchartsCore echarts={echarts} theme="shine" lazyUpdate {...other} />;
};

export default ReactEcharts;
