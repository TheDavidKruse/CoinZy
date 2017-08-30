import React, { Component } from 'react';
import * as coinActions from '../../actions/coins';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Coin from './Coin';
const io = require('socket.io-client');
const socket = io();


class CryptoTable extends Component {
  componentDidMount(){
    let self = this;
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
    console.log('glaobal',globalMsg);
    })
  }

  render () {
    console.log('props',this.props);
    let mappedCoins = this.props.coins.map((coin,index) => {
    return( <tr key={index}>
       <td>{coin.long} ({coin.short})</td>
      <td>${coin.mktcap}</td>
      <td>{coin.vwapData}</td>
      <td>${coin.price}</td>
      <td>{coin.supply}</td>
      <td>{coin.usdVolume}</td>
      <td>%{coin.perc}</td>
      </tr>
    )})
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
  console.log('state',state)
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
