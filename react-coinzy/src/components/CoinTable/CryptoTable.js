import React, { Component } from 'react';
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
      x:40
    }
  }
  componentDidMount(){
    let self = this;
    window.addEventListener('scroll', self.handleScroll.bind(self));
    this.props.coinActions.fetchCoins();
    var crypto = io.connect('http://socket.coincap.io');
    crypto.on('connection',function(socket){
      console.log('connected')
    })
  crypto.on('trades', function (tradeMsg) {
    var x = self.props.coins.find(function(e){
      if (e.short === tradeMsg.coin){
        self.props.coinActions.changeCoin(tradeMsg.msg)
      }
    })
  })
    crypto.on('global', function (globalMsg) {
    })
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
}

 handleScroll(e,state){
   if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
     this.setState({
       x:this.state.x+ 40
     })
     console.log('x',this.state.x)
   }
 }
  render () {
    let splitCoins = this.props.coins.slice(0,this.state.x);
    let mappedCoins = splitCoins.map((coin,index) => <Coin key={index} coin={coin}/>)
    return (
      <div><table className="table table-hover ">
  <thead>
    <tr>
      <th>Name</th>
      <th>Market Cap</th>
      <th>24hr VWAP</th>
      <th>Price (USD)</th>
      <th># Available</th>
      <th>24hr Volume</th>
      <th>24hr change</th>
    </tr>
  </thead>
  <tbody>
  {mappedCoins}
  </tbody>
</table></div>
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
