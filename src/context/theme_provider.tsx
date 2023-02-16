import { createContext, useState, useContext } from 'react';
import { theme } from 'antd';

export type Theme = "dark" | "light";
export type ThemeContextType = {
  theme: Theme,
  changeTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [themeMode, setThemeMode] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme: themeMode, changeTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext) as ThemeContextType;
}

