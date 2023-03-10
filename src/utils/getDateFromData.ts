import { Item } from "@/components/AccountTable/interface";
import { getYearAndMon } from "./switchTime";

// get "yyyy-mm" from Item[]
export default function getDateFromData(tableData: Item[]): string[] {
    const res = tableData.map((item) => getYearAndMon(new Date(item.time).getTime()));
    // 就算本月没有数据也要加上
    res.push(getYearAndMon(new Date().getTime()));
    return Array.from(new Set(res)).sort();
}
