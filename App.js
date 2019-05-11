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
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator,
            userId: 'ckTestNoRooms',
            tokenProvider: new TokenProvider({ url: tokenUrl })
        })

        chatManager.connect().then(currentUser => {
            console.log('Successful connection', currentUser)
            this.currentUser = currentUser
            this.getRooms()

        }).catch(err => console.log('Error on connection', err))
    }

    subscribeToRoom(roomId) {
        this.setState({ messages: [] })

        this.currentUser.subscribeToRoomMultipart({
            roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        }).then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRooms()
        }).catch(err => console.log('error on subscribing to room: ', err))
    }

    getRooms() {
        this.currentUser.getJoinableRooms().then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        }).catch(err => console.log('Error on joinableRooms: ', err))

    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }

    render() {
        return (
            <div className="app">
                <RoomList subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default App