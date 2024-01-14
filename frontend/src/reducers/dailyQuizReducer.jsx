import {
  DAILYQUIZ_REQUEST,
  DAILYQUIZ_SUCCESS,
  DAILYQUIZ_FAIL,
  GET_DAILYQUIZ_REQUEST,
  GET_DAILYQUIZ_SUCCESS,
  GET_DAILYQUIZ_FAIL
  } from "../constants/dailyQuizConstant";
  export const quizReducer = (state = { quiz: {} }, action) => {
    switch (action.type) {
      case DAILYQUIZ_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DAILYQUIZ_SUCCESS:
        return {
          ...state,
          loading: false,
          quiz: action.payload.data,
        };
  
      case DAILYQUIZ_FAIL:
        return {
          ...state,
          loading: false,
          quiz: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export const allQuizReducer = (state = { dailyquiz: [] }, action) => {
    switch (action.type) {
      case GET_DAILYQUIZ_REQUEST:
        return {
          loading: true,
          dailyquiz: [],
        };
  
      case GET_DAILYQUIZ_SUCCESS:
        return {
          ...state,
          loading: false,
          dailyquiz: action.payload,
        };
  
      case GET_DAILYQUIZ_FAIL:
        return {
          ...state,
          loading: false,
          dailyquiz: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };