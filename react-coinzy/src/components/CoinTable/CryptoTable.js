import React, { Component, forceUpdate } from 'react';
import * as coinActions from '../../actions/coins';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Coin from './Coin';
const io = require('socket.io-client');
const socket = io();


class CryptoTable extends Component {
  constructor(){
    super()
    this.state={
      x:40,
      filter:'',
    }

  }
  
  componentDidMount(){
    let self = this;
    self.onInputChange= self.onInputChange.bind(self)
    window.addEventListener('scroll', self.handleScroll.bind(self));
    this.props.coinActions.fetchCoins()
    var crypto = io.connect('http://socket.coincap.io');
    crypto.on('connection',function(socket){
      console.log('connected')
    })
    crypto.on('trades', function (tradeMsg) {
      var x = self.props.coins.find(function(e){
        if (e.short === tradeMsg.coin){
          self.props.coinActions.changeCoin(tradeMsg.msg);
          
        }
      })
    })
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScrollDown);
    socket.disconnect();
}
onInputChange(e){
  if(e.target.value.length >= 1){
    this.setState({
      filter: e.target.value
    })
  }
}

 handleScroll(e,state){
   if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
     this.setState({
       x:this.state.x+20
     })
   } else if (window.scrollY === 0){
     this.setState({
       x : 40
     })
   }
 }
  render () {
    const styler = {
      textAlign: 'right'
    }
    let filteredCoins = this.props.coins.filter(coin => coin.long.toLowerCase().includes(this.state.filter.toLowerCase()))
      .slice(0,this.state.x)
      .map((coin,index) => <Coin key={index} coin={coin} index={index}/>)
    return (
      <div>
      <input type="text" placeholder="Search Currencies" onChange={this.onInputChange.bind(this)}/>
      <table className="table table-hover ">
  <thead>
    <tr>
      <th>Name</th>
      <th style={styler}>Market Cap</th>
      <th style={styler}>24hr VWAP</th>
      <th style={styler}>Price (USD)</th>
      <th style={styler}># Available</th>
      <th style={styler}>24hr Volume</th>
      <th style={styler}>24hr change</th>
    </tr>
  </thead>
  <tbody>
  {filteredCoins}
  </tbody>
</table>
</div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    coins: state.coins
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    coinActions: bindActionCreators(coinActions, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CryptoTable);
