import {
  GET_USER,
  GET_USERS,
  SET_GLOBAL_ERROR,
  SET_MSG,
  NEW_DESTINATION,
  SET_PARENT_LOADING,
  SET_CHILD_LOADING,
  SET_STATIC_ERROR,
  INCREMENT_DAILY_UPVOTE,
} from './Types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case NEW_DESTINATION:
      return {
        ...state,
        linkInfo: action.payload,
      };
    case SET_PARENT_LOADING:
      return {
        ...state,
        parentLoading: action.payload,
      };
    case SET_CHILD_LOADING:
      return {
        ...state,
        childLoading: action.payload,
      };
    case SET_MSG:
      return {
        ...state,
        globalMsg: action.payload,
      };
    case SET_GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.payload,
      };
    case SET_STATIC_ERROR:
      return {
        ...state,
        staticError: action.payload,
      };
    case INCREMENT_DAILY_UPVOTE:
      return {
        ...state,
        upvoteData: action.payload,
      };
    case 'GET_DAILY_UPVOTE':
      return {
        ...state,
        upvoteData: action.payload,
      };
    case 'SET_SPECIAL_LOADING':
      return {
        ...state,
        specialLoadSystem: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
