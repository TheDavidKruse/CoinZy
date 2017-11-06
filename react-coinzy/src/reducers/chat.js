let initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_M_FULFILLED':
      return state.concat(action.payload.data)

      case 'POST_M_FULFILLED':
        return state.concat(action.payload)

      case 'add':
      return state.concat(action.payload)
    default:
      return state;
  }
}
