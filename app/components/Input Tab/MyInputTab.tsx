import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { inputProps } from './interface';

const MyInputTab = ({placeholderText, value, onChangeText}: inputProps) => {
  const {theme} = useTheme();
  return (
    <TextInput 
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholderText}
    placeholderTextColor={'grey'}
    style={[styles.container, {backgroundColor: theme.background.primary, color: theme.text.primary}]}
    />
  )
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '90%',
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 400,
        paddingHorizontal: 15,
        alignSelf: 'center',
    }
})

export default MyInputTab