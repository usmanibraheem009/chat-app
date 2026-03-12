import { KeyboardType } from "react-native";

export interface inputProps{
    placeholderText: string,
    value: any,
    onChangeText: (text: string) => void,
    keyboardType? : KeyboardType
}