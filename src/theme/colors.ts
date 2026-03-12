import { semanticColors } from "./type";

export const lightSemanticColors: semanticColors = {
    background: {
        primary: "#ffffff",
        secondary: "#D0FFBC",
        tertiary: "#FAF9F6",
       
    },
    surface: {
        primary: "#1CA55E",
        secondary: "#144D37",
        elevated: "#ffffff",
    },
    text: {
        primary: "#171717",
        secondary: "#2563EB",
        tertiary: "#BF40BF",
        disabled: "#a3a3a3",
        inverse: "#ffffff",
    },
    border: {
        primary: "#e5e5e5",
        secondary: "#d4d4d4",
        focus: "#0ea5e9",
    },
};

export const darkSemanticColors: semanticColors = {
    background: {
        primary: "#0a0a0a",
        secondary: "#023020",
        tertiary: "#161F23",
    },
    surface: {
        // primary: "#1CA55E",
        primary: "#20BB61",
        secondary: "#D0FFBC",
        elevated: "#262626",
    },
    text: {
        primary: "#fafafa",
        secondary: "#2563EB",
        tertiary: "#ffff",
        disabled: "#525252",
        inverse: "#171717",
    },
    border: {
        primary: "#262626",
        secondary: "#404040",
        focus: "#38bdf8",
    },
};

export interface ThemeColors extends semanticColors {
  primary: string;
  secondary: string;
  neutral: string;
  success: string;
  warning: string;
  error: string;
};

