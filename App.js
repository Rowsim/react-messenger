import React from 'react'
import MessageList from './components/message/MessageList';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <MessageList />
            </div>
        );
    }
}

export default App