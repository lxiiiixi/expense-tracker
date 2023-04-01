import { Item, RowSpanData } from "@/components/AccountTable/interface";

// sort by time => get RowSpanData[]
// 先按照时间排序 => 获得增加了Row属性的对象数字(用于时间列的合并)
const getRowSpanData = (arr: Item[]): RowSpanData[] => {
    let names: Array<string> = [];
    return arr
        .sort((item1, item2) => new Date(item1.time).getTime() - new Date(item2.time).getTime())
        .map((element) => {
            if (names.includes(element.time)) {
                return { ...element, rowSpan: 0 };
            } else {
                const num = arr.filter((item) => item.time === element.time).length;
                names.push(element.time);
                return { ...element, rowSpan: num };
            }
        });
};

export default getRowSpanData;
