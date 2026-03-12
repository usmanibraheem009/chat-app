import ThemeButton from '@/src/components/primitives/themeButton';
import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTheme } from '../redux/slices/themeSlice/themeSlice';

const settings = () => {
    const {theme, mode} = useTheme();
    const dispatch = useDispatch();

  return (
    <View style={[styles.container, {backgroundColor: theme.background.primary}]}>
      <Text style={[styles.titleText, {color: theme.text.primary}]}>Theme Mode</Text>
      <ThemeButton icon={'bulb'} title='Light Mode' onPress={() => dispatch(setTheme('light'))} isActive={mode == 'light'? true: false} />
      <ThemeButton icon={'moon-sharp'} title='dark Mode' onPress={() => dispatch(setTheme('dark'))} isActive={mode == 'dark'? true: false} />
      <ThemeButton icon={'phone-portrait'} title='use system settings' onPress={() => dispatch(setTheme('system'))} isActive={mode == 'system'? true: false} />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        gap: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 500,
        marginLeft: 10,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
});

export default settings