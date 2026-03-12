import React from 'react';
import { StyleSheet, Text } from 'react-native';


type props = {
    errorText : string;
}

const ErrorText = ({errorText}: props) => {
  return (
    <Text style={styles.text}>{errorText}</Text>
  )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: 'red',
        fontWeight: 400,
        alignSelf: 'flex-start',
        paddingLeft: 30
    }
})

export default ErrorText