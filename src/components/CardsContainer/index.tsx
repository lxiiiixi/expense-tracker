import { Card, Space } from "antd";
import FullPie from "../Echarts/PieChart";
const LiquidityTableData = [
    {
        value: 574751,
        name: "UniswapV2 INV-WETH",
    },
    {
        value: 92150,
        name: "Sushiswap INV-WETH",
    },
    {
        value: 43377,
        name: "Sushiswap INV-DOLA",
    },
];

const Index = () => {
    return (
        <div className="bg-slate-100 h-auto w-full rounded-l-xl py-4 px-6 shadow-xl">
            <h2 className="text-left">Cards</h2>
            <div className="flex flex-col">
                <Card className="my-2 shadow-sm hover:shadow-lg">Card</Card>
                <Card className="my-2 shadow-sm hover:shadow-lg">
                    <FullPie data={LiquidityTableData} />
                </Card>
            </div>
        </div>
    );
};

export default Index;
