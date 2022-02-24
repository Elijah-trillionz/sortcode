import { SET_ERROR, SET_MSG, SET_PARENT_LOADING } from './Types';

const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_MSG:
      return {
        ...state,
        msg: action.payload,
      };
    case SET_PARENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
