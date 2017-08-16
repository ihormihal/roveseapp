const initialState = [];

export default function sellers (state = initialState, action) {
  if(action.type === 'LOAD_SELLERS'){
    return action.data;
  }else{
    return state;
  }
}
