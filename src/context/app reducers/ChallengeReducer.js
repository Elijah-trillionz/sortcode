import {
  NEXT_TASK,
  SET_PARENT_LOADING,
  ADD_TASKS,
  CURRENT_TASK_NUM,
  TASK_SOLUTIONS,
  SET_CHILD_LOADING,
  SET_PRIV_LOADING,
  GET_ALL_TASKS,
  SET_STATIC_ERROR,
  SET_GLOBAL_ERROR,
  SET_ERROR,
  SET_SUCCESS_INDICATOR,
  SET_LANGUAGE,
  GET_CURRENT_TASK_ID,
  DISPLAY_SAMPLE,
  GET_BENCHMARK_RESULT,
  SET_NEW_TASK_LOADING,
} from './Types';

const challengeReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case CURRENT_TASK_NUM:
      return {
        ...state,
        index:
          state.tasks.length <= action.payload ? undefined : action.payload,
      };
    case NEXT_TASK:
      return {
        ...state,
        index:
          state.tasks.length !== state.index + 1
            ? action.payload + 1
            : undefined,
      };
    case GET_CURRENT_TASK_ID:
      return {
        ...state,
        currentTaskId: action.payload,
      };
    case TASK_SOLUTIONS:
      return {
        ...state,
        taskSolutions: action.payload,
      };
    case ADD_TASKS:
      return {
        ...state,
        taskSolutions: [...state.taskSolutions, action.payload],
      };
    case GET_BENCHMARK_RESULT:
      return {
        ...state,
        benchmarkResult: action.payload.result
          ? action.payload.result
          : action.payload.error,
      };
    case DISPLAY_SAMPLE:
      return {
        ...state,
        taskSample: action.payload[1]
          ? false
          : state.tasks.filter((task) => {
              return task.id === action.payload[0];
            }),
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
    case SET_PRIV_LOADING:
      return {
        ...state,
        privLoading: action.payload,
      };
    case SET_NEW_TASK_LOADING:
      return {
        ...state,
        newTaskLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        challengeError: action.payload,
      };
    case SET_GLOBAL_ERROR:
      return {
        ...state,
        challengeGlobalError: action.payload,
      };
    case SET_STATIC_ERROR:
      return {
        ...state,
        staticError: action.payload,
      };
    case SET_SUCCESS_INDICATOR:
      return {
        ...state,
        successIndicator: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default challengeReducer;
