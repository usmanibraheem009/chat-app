import MessageBubble from '@/src/components/primitives/message-bubble'
import { useTheme } from '@/src/hooks/useTheme'
import { getMessages, sendMessage } from '@/src/services/firestore/firestoreServices'
import { formattedDate } from '@/src/utils/formatted-date-time'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MyInputTab from '../components/Input Tab/MyInputTab'
import { setMessages } from '../redux/slices/messageSlice/messageSlice'

const ChatScreen = () => {

    const { userId, name, photo } = useLocalSearchParams()

    const dispatch = useDispatch()
    const { theme } = useTheme()

    const messages = useSelector((state: any) => state.messagesList.messages)
    const { user } = useSelector((state: any) => state.authReducer)

    const [message, setMessage] = useState('')
    const flatListRef = useRef<any>(null)

    const chatId =
        user?.id && userId
            ? [user.id, userId].sort().join("_")
            : null

    useEffect(() => {

        if (!chatId) return

        const unsubscribe = getMessages(chatId, (msgs: any) => {
            dispatch(setMessages(msgs))
            scrollToBottom()
        })

        return () => unsubscribe && unsubscribe()

    }, [chatId])

    const scrollToBottom = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true })
        }, 300)
    }

    const handleSend = async () => {
        if (!message.trim() || !chatId || !userId) return

        sendMessage( chatId, message, userId as string );
        setMessage('');
    }

    if (!user || !userId) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: theme.background.primary }}>
                <ActivityIndicator size="large" color={theme.text.primary}/>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
                    <View style={styles.header}>
                        <Ionicons name='arrow-back' size={22} color={theme.text.primary} onPress={() => router.back()} />

                        <Image source={{ uri: photo as string }} style={styles.profileImage} />

                        <View>
                            <Text style={[styles.userName, { color: theme.text.primary }]}>{name}</Text>
                            <Text style={styles.status}>Online</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <MaterialIcons name='more-vert' size={22} color={theme.text.primary} />
                        </View>
                    </View>

                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        onContentSizeChange={flatListRef.current?.scrollToEnd({ animated: true })}
                        renderItem={({ item, index }) => {

                            const isMyMessage = item.senderId === user?.id;
                            const previousMessage = messages[index - 1];
                            const showDateSeperater = !previousMessage || formattedDate(item.createdAt) !== formattedDate(previousMessage.createdAt);

                            return (
                                <MessageBubble message={item} isMyMessage={isMyMessage} theme={theme} showDateSeperator={showDateSeperater} />
                            )
                        }}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 10, width: '100%', justifyContent: 'space-around' }}>
                        <MyInputTab placeholderText='Type message' value={message} onChangeText={setMessage} />

                        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
                            <Ionicons name={message ? 'send' : 'mic'} size={25} color={theme.text.primary} />
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    arrowBack: {
        fontSize: 22,
        marginLeft: 10,
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    userName: {
        fontSize: 18,
        fontWeight: 500,
    },
    status: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 500
    },
    sendBtn: {
        backgroundColor: 'green',
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    msgBubble: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxWidth: '70%',
        minWidth: '30%'
    },
    timerText: {
        fontSize: 14,
        fontWeight: 500,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        overflow: 'hidden'
    },
    timeSeperator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        padding: 5,
        borderRadius: 10,
        width: '30%',
        alignSelf: 'center'
    }
});