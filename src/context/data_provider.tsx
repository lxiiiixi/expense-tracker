import { createContext, useState, useContext } from "react";
import { Item } from "@/components/AccountTable/interface";

export type DataContextType = {
    wholeData: Item[];
    changeWholeData: (config: Item[]) => void;
};

export const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [wholeData, setWholeData] = useState<Item[]>([]);

    return (
        <DataContext.Provider value={{ wholeData, changeWholeData: setWholeData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    return useContext(DataContext) as DataContextType;
}
