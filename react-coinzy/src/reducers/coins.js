let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COINS_PENDING':
      console.log('Pending request...');
      return state;

    case 'FETCH_COINS_FULFILLED':
      console.log('Fullfilled request!', action.payload);
      return [...action.payload.data];

    case 'FETCH_COINS_REJECTED':
      console.log('Fetch rejected! D:');
      return state;

      case 'change':
      var x = state.findIndex(function(e,i,a){
        return e.short === action.payload.short
      })
      Object.assign(state[x],action.payload)
      return [...state]
    default:
    console.log('DEFAULTED')
      return state;
  }
}
