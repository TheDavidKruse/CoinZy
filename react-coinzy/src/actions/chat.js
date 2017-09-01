import axios from 'axios';

export const fetchMessages = () => {
  console.log('found messages!')
  return {type: 'FETCH_M', payload: axios.get(`http://localhost:8000/messages`)}
}
export const newMessageAdd = (message) => {
   return {type:'POST_M',payload:axios.post(`http://localhost:8000/messages`)}

}

export const AppendMessage = (message) => {
  console.log('appending message',message)
  return {type:'add',payload:message}
}
