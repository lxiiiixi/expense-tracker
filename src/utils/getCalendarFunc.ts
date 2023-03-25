import { Item } from "@/components/AccountTable/interface";
interface calendarData {
    time: string;
    cost: number;
}

// 根据所有数据得到某一个月每一天的所有数据
export const getCalendarFunc = (itemArr:  Item[]) => {
    let obj: { [key: string]: number } = {};
    itemArr.forEach((item) => {
        if (obj[item.time]) {
            obj[item.time] += item.cost;
        } else {
            obj[item.time] = item.cost;
        }
    });
    const calendarData: calendarData[] = [];
    for (let i in obj) {
        calendarData.push({ time: i, cost: obj[i] });
    }
    return calendarData;
};
