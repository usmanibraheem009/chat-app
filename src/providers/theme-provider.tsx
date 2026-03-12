import { createContext } from "react";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { darkSemanticColors, lightSemanticColors } from "../theme/colors";

const ThemeContext = createContext<any>(null);

const ThemeProvider = ({children}: any ) => {
    const mode = useSelector((state: any) => state.themeMode.currentMode);

    const systemTheme = useColorScheme();

    let theme;

    if(theme === 'system'){
        theme = systemTheme === 'dark'? darkSemanticColors : lightSemanticColors
    }else{
        theme= mode === 'dark'? darkSemanticColors : lightSemanticColors
    };

    return(
        <ThemeContext.Provider value={{theme, mode}}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;