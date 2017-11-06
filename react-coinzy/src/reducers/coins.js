let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COINS_PENDING':
      return state;

    case 'FETCH_COINS_FULFILLED':
      return [...action.payload.data];

    case 'FETCH_COINS_REJECTED':
      return state;

      case 'change':
      var x = state.findIndex(function(e,i,a){
        return e.short === action.payload.short
      })
      Object.assign(state[x],action.payload)
      return [...state]

      case 'filter':
      return state.filter((e,i,a) => e.long.includes(action.payload))

    default:
      return state;
  }
}
