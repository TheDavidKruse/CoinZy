import axios from 'axios';

export const fetchCoins = () => {
  return {type: 'FETCH_COINS', payload: axios.get(`http://www.coincap.io/front`)}
}
export const changeCoin = (coin) => {
  return {type:'change',payload:coin}
}

export const filterCoin = (phrase) => {
  return {type:'filter',payload:phrase}
}
