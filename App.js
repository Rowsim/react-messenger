import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client/react-native'
import MessageList from './components/message/MessageList'

import { tokenUrl, instanceLocator } from './config'
import SendMessageForm from './components/message/SendMessageForm';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: []
        }

        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator,
            userId: 'ckTest1',
            tokenProvider: new TokenProvider({ url: tokenUrl })
        })

        chatManager.connect().then(currentUser => {
            console.log('Successful connection', currentUser)

            this.currentUser = currentUser
            this.currentUser.subscribeToRoomMultipart({
                roomId: '19431228',
                hooks: {
                    onMessage: message => {
                        console.log('message: ', message);
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        }).catch(err => {
            console.log('Error on connection', err)
        })
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: '19431228'
        })
    }

    render() {
        return (
            <div className="app">
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default App