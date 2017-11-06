import React from 'react'
const Coin = (props) => {
  const styler = {
    'text-align': 'right'
  }
  return (
    <tr>
      <td>{props.coin.long} ({props.coin.short})</td>
      <td style={styler}>${props.coin.mktcap.toLocaleString()}</td>
      <td style={styler}>{props.coin.vwapData.toLocaleString()}</td>
      <td style={styler}>${props.coin.price.toLocaleString()}</td>
      <td style={styler}>{props.coin.supply.toLocaleString()}</td>
      <td style={styler}>{props.coin.usdVolume.toLocaleString()}</td>
      <td style={styler}>{props.coin.perc}%</td>
    </tr>
  )
}
export default Coin
