const initialState = {
    price:""
  };
  
  function currencyRatesReducer(state = initialState, action) {
    if (action.type === 'GET_PRICE') {
        return Object.assign({}, state, {
            price:action.payload
          });
      }
    return state;
  };
  
  export default currencyRatesReducer;