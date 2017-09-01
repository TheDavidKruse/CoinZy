let initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_M_FULFILLED':
    console.log('messages are:',action.payload)
      return state.concat(action.payload.data)

      case 'POST_M_FULFILLED':
        return state.concat(action.payload)

      case 'add':
      console.log("adding comment",action.payload)
      return state.concat(action.payload)
    default:
      return state;
  }
}
