import { Item } from "@/components/AccountTable/interface";
interface PieChartData {
    name: string;
    value: number;
}
// 根据不同分类得到所有数据
export const getPieChart = (itemArr: Item[]) => {
    let obj: { [key: string]: number } = {};
    itemArr.forEach((item) => {
        if (obj[item.category]) {
            obj[item.category] += item.cost;
        } else {
            obj[item.category] = item.cost;
        }
    });
    const chartData: PieChartData[] = [];
    for (let i in obj) {
        chartData.push({ name: i, value: obj[i] });
    }
    return chartData;
};
