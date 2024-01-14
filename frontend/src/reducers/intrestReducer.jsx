import {
  INTREST_REQUEST,
  INTREST_SUCCESS,
  INTREST_FAIL,
  INTREST_FAIL_UPDATE,
  INTREST_SUCCESS_UPDATE,
  INTREST_REQUEST_UPDATE,
  GETALL_INTREST_FAIL,
  GETALL_INTREST_REQUEST,
  GETALL_INTREST_SUCCESS,
} from "../constants/interestConstant";

export const intrestReducer = (state = { interest: {} }, action) => {
  switch (action.type) {
    case INTREST_REQUEST:
      return {
        ...state,
        loading: true,
        
      };

    case INTREST_SUCCESS:
      return {
        ...state,
        loading: false,
        interest: action.payload.data,
      };

    case INTREST_FAIL:
      return {
        ...state,
        loading: false,
        interest: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allIntrestReducer = (state = { interests: [] }, action) => {
  switch (action.type) {
    case GETALL_INTREST_REQUEST:
      return {
        loading: true,
        interests: [],
      };

    case GETALL_INTREST_SUCCESS:
      return {
        ...state,
        loading: false,
        interests: action.payload,
      };

    case GETALL_INTREST_FAIL:
      return {
        ...state,
        loading: false,
        interests: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updateIntrestReducer = (state = { interests: [] }, action) => {
  switch (action.type) {
    case INTREST_REQUEST_UPDATE:
      return {
        loading: true,
        interests: [],
      };

    case INTREST_SUCCESS_UPDATE:
      return {
        ...state,
        loading: false,
        interests: action.payload,
      };

    case INTREST_FAIL_UPDATE:
      return {
        ...state,
        loading: false,
        interests: [],
        error: action.payload,
      };
    default:
      return state;
  }
};