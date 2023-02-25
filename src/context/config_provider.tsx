import { createContext, useState, useContext } from "react";

export type Config = {
    category: string[];
};
export type ConfigContextType = {
    config: Config;
    changeConfig: (config: Config) => void;
};

export const ConfigContext = createContext<ConfigContextType | null>(null);

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<Config>({ category: [] });

    return (
        <ConfigContext.Provider value={{ config, changeConfig: setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfigContext() {
    return useContext(ConfigContext) as ConfigContextType;
}
