import {
  CURRENT_QUESTION_NUM,
  NEXT_QUESTION,
  SET_PARENT_LOADING,
  SET_SCORE,
  SET_CURRENT_SCORE,
  SET_CHILD_LOADING,
  SET_ERROR,
  GET_ALL_QUESTIONS,
  SET_STATIC_ERROR,
  SET_GLOBAL_ERROR,
} from './Types';
const quizReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case CURRENT_QUESTION_NUM:
      return {
        ...state,
        index: action.payload,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        index: action.payload + 1,
      };
    case SET_SCORE:
      return {
        ...state,
        score: action.payload,
        isIncremented: true,
      };
    case SET_CURRENT_SCORE:
      return {
        ...state,
        currentScore: action.payload,
        isIncremented: false,
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
    case SET_ERROR:
      return {
        ...state,
        quizError: action.payload,
      };
    case SET_GLOBAL_ERROR:
      return {
        ...state,
        quizGlobalError: action.payload,
      };
    case SET_STATIC_ERROR:
      return {
        ...state,
        staticError: action.payload,
      };
    default:
      return state;
  }
};

export default quizReducer;
