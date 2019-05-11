import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client/react-native'
import MessageList from './components/message/MessageList'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        const chatManager = new ChatManager({
             instanceLocator,
             userId: 'ckTest1',
             tokenProvider: new TokenProvider({url: tokenUrl})
        })

        chatManager.connect().then(currentUser => {
            console.log('Successful connection', currentUser)

            currentUser.subscribeToRoomMultipart({
                roomId: '19431228',
                hooks: {
                    onMessage: message => {
                        console.log('message: ', message);
                        this.setState( {
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        }).catch(err => {
            console.log('Error on connection', err)
        })
    }

    render() {
        return (
            <div className="app">
                <MessageList messages={this.state.messages}/>
            </div>
        );
    }
}

export default App