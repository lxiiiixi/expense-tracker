import { createContext, useState, useContext } from "react";
import { getYearAndMon } from "@/utils/switchTime";

export type Config = {
    category: string[];
    dates: string[];
    nowDate: string;
};
export type ConfigContextType = {
    config: Config;
    changeConfig: (config: Config) => void;
};

export const ConfigContext = createContext<ConfigContextType | null>(null);

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<Config>({
        category: [],
        nowDate: "",
        // nowDate: getYearAndMon(new Date().getTime()),
        dates: [],
    });

    return (
        <ConfigContext.Provider value={{ config, changeConfig: setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfigContext() {
    return useContext(ConfigContext) as ConfigContextType;
}
