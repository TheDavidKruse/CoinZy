import React, { Component } from 'react';
import * as messageActions from '../../actions/chat'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const io = require('socket.io-client');
const chat = io.connect('http://localhost:8080');


class Chat extends Component {
  constructor() {
    super();

    this.state={
      input:''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this._handleMessageEvent = this._handleMessageEvent.bind(this)
  }


  componentDidMount(){
    this._handleMessageEvent()

  }

  _handleMessageEvent(){
    chat.on('chat message', (inboundMessage) => {
      console.log("inbound message",inboundMessage)
      this.props.messageActions.AppendMessage(inboundMessage)
       })
    }

    handleOnSubmit(ev) {
    ev.preventDefault()
    chat.emit('chat message', { username:'ModernTotem',user_id: 1,message: this.state.input })
    this.props.messageActions.newMessageAdd({ username:'ModernTotem',user_id: 1,message: this.state.input })
    this.props.messageActions.AppendMessage({ username:'ModernTotem',message:this.state.input })
      this.setState({ input: '' })
  }

  handleOnChange(ev) {
  this.setState({ input: ev.target.value })
}


  render () {
let mappedMessages = this.props.messages.map(message => {
      return (
        <li>{message.username} : {message.message}</li>
      )
})
    return (
      <div>
      <div style={{position:'fixed'}}>
      <ul id="messages" style={{listStyleType: 'none', margin: '0px', padding:'0px',overflowY:'scroll', height:'500px'}}>{mappedMessages}</ul>
    <form onSubmit={this.onChange}>
      <input id="m" autoComplete="off" onChange={this.handleOnChange} />
      <button onClick={this.handleOnSubmit}>Send</button>
    </form>
      </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    messages: state.chat
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    messageActions: bindActionCreators(messageActions, dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat);
