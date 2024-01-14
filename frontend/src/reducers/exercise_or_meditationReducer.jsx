import {
    EXERCISE_FAIL,
    EXERCISE_REQUEST,
    EXERCISE_SUCCESS,
    GETALL_EXERCISE_FAIL,
    GETALL_EXERCISE_REQUEST,
    GETALL_EXERCISE_SUCCESS,
    UPDATE_EXERCISE_FAIL,
    UPDATE_EXERCISE_REQUEST,
    UPDATE_EXERCISE_SUCCESS,
  } from "../constants/exercise_or_meditationConstant";
    export const exerciseReducer = (state = { exercise: {} }, action) => {
        switch (action.type) {
          case EXERCISE_REQUEST:
            return {
              ...state,
              loading: true,
            };
      
          case EXERCISE_SUCCESS:
            return {
              ...state,
              loading: false,
              exercise: action.payload.data,
            };
      
          case EXERCISE_FAIL:
            return {
              ...state,
              loading: false,
              exercise: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };
      export const allExerciseReducer = (state = { getexercise: [] }, action) => {
        switch (action.type) {
          case GETALL_EXERCISE_REQUEST:
            return {
              loading: true,
              getexercise: [],
            };
      
          case GETALL_EXERCISE_SUCCESS:
            return {
              ...state,
              loading: false,
              getexercise: action.payload,
            };
      
          case GETALL_EXERCISE_FAIL:
            return {
              ...state,
              loading: false,
              getexercise: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };
      export const updateExerciseReducer = (state = { updateexercise: [] }, action) => {
        switch (action.type) {
          case UPDATE_EXERCISE_REQUEST:
            return {
              loading: true,
              updateexercise: [],
            };
      
          case UPDATE_EXERCISE_SUCCESS:
            return {
              ...state,
              loading: false,
              updateexercise: action.payload,
            };
      
          case UPDATE_EXERCISE_FAIL:
            return {
              ...state,
              loading: false,
              updateexercise: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };