import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client/react-native'
import { tokenUrl, instanceLocator } from './config'
import MessageList from './components/message/MessageList'
import SendMessageForm from './components/message/SendMessageForm';
import RoomList from './components/room/RoomList';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: [],
            joinableRooms: [],
            joinedRooms: []
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

            this.currentUser.getJoinableRooms().then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            }).catch(err => console.log('Error on joinableRooms: ', err))

            this.currentUser.subscribeToRoomMultipart({
                roomId: '19431228',
                hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        }).catch(err => console.log('Error on connection', err))
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
                <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default App