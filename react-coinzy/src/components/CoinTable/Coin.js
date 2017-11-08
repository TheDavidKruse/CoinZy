import React from 'react';
import { withRouter } from 'react-router-dom';

const Coin = (props) => {
  const styler = {
    textAlign: 'right'
  }

  const Coin = withRouter(({history}) => (
    <tr onClick={() => history.push(`/coin/${props.index}`)}>
    <td>{props.coin.long} ({props.coin.short})</td>
    <td style={styler}>${props.coin.mktcap.toLocaleString()}</td>
    <td style={styler}>{props.coin.vwapData.toLocaleString()}</td>
    <td style={styler}>${props.coin.price.toLocaleString()}</td>
    <td style={styler}>{props.coin.supply.toLocaleString()}</td>
    <td style={styler}>{props.coin.usdVolume.toLocaleString()}</td>
    <td style={styler}>{props.coin.perc}%</td>
  </tr>
  ))
  return (
    <Coin/>
  )
}
export default Coin
