import { useTheme } from '@/src/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type tabBarProps = {
    title: string,
    icon: React.ComponentProps<typeof Ionicons>['name'],
    onPress: () => void,
    isActive: boolean,
}

const ThemeButton = ({ title, icon, onPress, isActive }: tabBarProps) => {

    const {theme} = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, {backgroundColor: theme.background.primary, borderColor: theme.border.primary}]}>
                <View style={styles.titleWrapper}>
                    <Ionicons name={icon} style={{fontSize: 20}} color={theme.text.primary}/>
                    <Text style={[styles.title, {color: theme.text.primary}]}>{title}</Text>
                </View>
                <Ionicons name={isActive? 'radio-button-on': 'radio-button-off'} style={{fontSize: 22}} color={theme.text.primary}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: { 
        height: 'auto',
        width: '90%',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        borderWidth: 1
    },
    titleWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
    }
})

export default ThemeButton