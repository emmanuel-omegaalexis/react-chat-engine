import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import { 
    ChatEngine, 
    ChatEngineContext,
    ChatList,
    ChatCard,
    NewChatForm,
    ChatFeed,
    ChatHeader,
    IceBreaker,
    MessageBubble,
    IsTyping,
    NewMessageForm,
    ChatSettings,
    ChatSettingsTop,
    PeopleSettings,
    PhotosSettings,
    OptionsSettings,
} from 'react-chat-engine'

const ChatEngineApp = props => {
    const { chats, messages, setActiveChat, setConnecting } = useContext(ChatEngineContext)
    const [hasSetLink, setLink] = useState(false)

    useEffect(() => {
        const { id } = props
        if (id && chats && chats[id] && !_.isEmpty(messages) && !hasSetLink) {
            setActiveChat(id)
            setLink(true)
        }
    }, [chats, messages, props, setActiveChat, hasSetLink, setLink])

    return (
        <div>
        <ChatEngine 
            {...props.accounts} 
            height={props.height} 
            projectID={props.projectID} 
            development={props.development} 
            // You want the extra args for outside components
            renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
            renderChatCard={(chat, index) => <ChatCard key={`card_${index}`} chat={chat} />}
            renderNewChatForm={(creds) => <NewChatForm creds={creds} />} 
            renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
            renderChatHeader={(chat) => <ChatHeader />}
            renderIceBreaker={(chat) => <IceBreaker />}
            renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
            renderSendingMessage={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble sending={true} lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
            renderIsTyping={(typers) => <IsTyping />}
            renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
            renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
            renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
            renderPeopleSettings={(creds, chat) => <PeopleSettings />}
            renderPhotosSettings={(chat) => <PhotosSettings />}
            renderOptionsSettings={(creds, chat) => <OptionsSettings />}
        />
        <button onClick={() => setConnecting(true)}>reconnect</button>
        </div>
    )
}

function mapStateToProps(state){
    return { accounts: state.accounts }
}

export default connect(mapStateToProps, {})(ChatEngineApp)
