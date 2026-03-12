import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import withButton from "./withButton";

const simpleButtonContent = ({ btnText }: { btnText: ReactNode }) => {
    return (<Text style={styles.simpleBtn}>{btnText}</Text>)
};

const ButtonContent = ({ btnContext, SvgImage }: { btnContext: string, SvgImage: React.FC<SvgProps> }) => {
    return (
        <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
            <SvgImage height={24} width={24} />
            <Text style={styles.socialBtn} >{btnContext}</Text>
        </View>
    )
}; 
export const SocialBtn = withButton(ButtonContent);

export const SimpleButton = withButton(simpleButtonContent);

const styles = StyleSheet.create({
    simpleBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 500,
    },
    socialBtn: {
        fontSize: 16,
        color: 'grey',
        fontWeight: 500,
        paddingLeft: 30
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})