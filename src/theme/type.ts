

export interface Typography {
    displayLarge: TextStyle,
    displayMedium: TextStyle,
    displaySmall: TextStyle,
    headlineLarge: TextStyle,
    headlineMedium: TextStyle,
    headlineSmall: TextStyle,
    titleLarge: TextStyle,
    titleMedium: TextStyle,
    titleSmall: TextStyle,
    bodyLarge: TextStyle,
    bodyMedium: TextStyle,
    bodySmall: TextStyle,
    labelLarge: TextStyle,
    labelMedium: TextStyle,
    labelSmall: TextStyle,
    actionLarge: TextStyle,
};

export interface TextStyle {
    fontSize: number,
    lineHeight: number,
    fontWeight: FontWeight,
    letterSpacing: number,
    fontFamily: string,
};

export type FontWeight = 
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export interface semanticColors{
    background: {
        primary: string,
        secondary: string,
        tertiary: string,
    },
    surface: {
        primary: string,
        secondary: string,
        elevated: string,
    },
    text: {
        primary: string,
        secondary: string,
        tertiary: string,
        disabled: string,
        inverse: string,
    },
    border: {
        primary: string,
        secondary: string,
        focus: string,
    },    

}