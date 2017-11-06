import axios from 'axios';

export const fetchMessages = () => {
  return {type: 'FETCH_M', payload: axios.get(`http://localhost:8000/messages`)}
}
export const newMessageAdd = (message) => {
   return {type:'POST_M',payload:axios.post(`http://localhost:8000/messages`)}

}

export const AppendMessage = (message) => {
  return {type:'add',payload:message}
}
