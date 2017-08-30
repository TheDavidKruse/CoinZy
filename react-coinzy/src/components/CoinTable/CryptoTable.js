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
      x:40,
      search:''
    }

  }
  componentDidMount(){
    let self = this;
    self.onInputChange= self.onInputChange.bind(self)
    window.addEventListener('scroll', self.handleScrollDown.bind(self));
    window.addEventListener('scroll', self.handleScrollUp.bind(self));
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
    window.removeEventListener('scroll', this.handleScrollDown);
}
onInputChange(e){
  if(e.target.value.length >= 1){
    this.props.coinActions.filterCoin(e.target.value)
  }else{
    this.props.coinActions.fetchCoins();
  }
}

 handleScrollDown(e,state){
   if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
     this.setState({
       x:this.state.x+20
     })
     console.log('x',this.state.x,'y',this.state.y)
   }
 }

 handleScrollUp(e,state){
   if (document.body.scrollTop === 0) {
     this.setState({
       x:this.state.x=41
     })

     console.log('x',this.state.x,'y',this.state.y)
   }
 }
  render () {
    let splitCoins = this.props.coins.slice(this.state.y,this.state.x);
    let mappedCoins = splitCoins.map((coin,index) => <Coin key={index} coin={coin}/>)
    return (
      <div>
      <input type="text" placeholder="Search Currencies" onChange={this.onInputChange}/>
      <table className="table table-hover ">
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
