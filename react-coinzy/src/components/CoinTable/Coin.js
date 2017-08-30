import React from 'react'
const Coin = (props) => {
  return (
    <tr>
      <td>{props.coin.long} ({props.coin.short})</td>
      <td>${props.coin.mktcap}</td>
      <td>{props.coin.vwapData}</td>
      <td>${props.coin.price}</td>
      <td>{props.coin.supply}</td>
      <td>{props.coin.usdVolume}</td>
      <td>%{props.coin.perc}</td>
    </tr>
  )
}
export default Coin
