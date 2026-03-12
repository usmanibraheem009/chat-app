import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formattedDate, formattedTime } from '@/src/utils/formatted-date-time'

const MessageBubble = ({ message, isMyMessage, showDateSeperator, theme }: any) => (
    <View>
        {showDateSeperator && (
            <View style={[styles.dateSeperator, { backgroundColor: theme.surface.primary }]}>
                <Text style={styles.timerText}>{formattedDate(message.createdAt)}</Text>
            </View>
        )}

        <View style={[styles.messageBubble, {
            backgroundColor: isMyMessage ? theme.background.secondary : theme.background.tertiary,
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
            borderBottomLeftRadius: isMyMessage ? 12 : 0,
            borderBottomRightRadius: isMyMessage ? 0 : 12,
        }]}>
            <Text style={{ fontSize: 18, color: theme.text.primary }}>{message.text}</Text>
            <Text style={{ fontSize: 10, color: "grey", alignSelf: "flex-end", marginTop: 2 }}>{formattedTime(message.createdAt)}</Text>
        </View>
    </View>
)

export default MessageBubble

const styles = StyleSheet.create({
    dateSeperator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        padding: 5,
        borderRadius: 10,
        width: '30%',
        alignSelf: 'center'
    },

    timerText: {
        fontSize: 14,
        fontWeight: 500,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        overflow: 'hidden'
    },

    messageBubble: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxWidth: '70%',
        minWidth: '30%'
    }
})