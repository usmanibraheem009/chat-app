import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type ButtonProps = {
    backgroundColor: string,
    onPress: () => void,
}

const withButton = <P extends object>(Component: React.ComponentType<P>) => {
    return function (props: ButtonProps & P) {
        const { backgroundColor, onPress, ...rest } = props;
        return (
            <TouchableOpacity style={[styles.container, {backgroundColor }]} onPress={onPress}>
                <Component {...rest as P} />
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '90%',
        borderRadius: 30,
        elevation: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        flexDirection: 'row',
    }
})

export default withButton