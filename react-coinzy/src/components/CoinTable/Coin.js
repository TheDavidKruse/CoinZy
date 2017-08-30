import React from 'react'
const Coin = (props) => {
  return (
    <tr>
      <td>{props.coin.long} ({props.coin.short})</td>
      <td>${props.coin.mktcap.toLocaleString()}</td>
      <td>{props.coin.vwapData.toLocaleString()}</td>
      <td>${props.coin.price.toLocaleString()}</td>
      <td>{props.coin.supply.toLocaleString()}</td>
      <td>{props.coin.usdVolume.toLocaleString()}</td>
      <td>%{props.coin.perc}</td>
    </tr>
  )
}
export default Coin
