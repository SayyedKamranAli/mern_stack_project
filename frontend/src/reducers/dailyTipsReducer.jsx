import {
  DAILYTIPS_REQUEST,
  DAILYTIPS_SUCCESS,
  DAILYTIPS_FAIL,
  ALL_DAILYTIPS_REQUEST,
  ALL_DAILYTIPS_SUCCESS,
  ALL_DAILYTIPS_FAIL,
  UPDATE_DAILYTIPS_REQUEST,
  UPDATE_DAILYTIPS_SUCCESS,
  UPDATE_DAILYTIPS_FAIL
} from "../constants/dailyTipsConstant";
export const dailyTipsReducer = (state = { dailytips: {} }, action) => {
  switch (action.type) {
    case DAILYTIPS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DAILYTIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        dailytips: action.payload.data,
      };

    case DAILYTIPS_FAIL:
      return {
        ...state,
        loading: false,
        dailytips: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export const allDailyTipsReducer = (state = { dailytips: [] }, action) => {
  switch (action.type) {
    case ALL_DAILYTIPS_REQUEST:
      return {
        loading: true,
        dailytips: [],
      };

    case ALL_DAILYTIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        dailytips: action.payload,
      };

    case ALL_DAILYTIPS_FAIL:
      return {
        ...state,
        loading: false,
        dailytips: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updateDailyTipsReducer = (state = { updatedailyTips: [] }, action) => {
  switch (action.type) {
    case UPDATE_DAILYTIPS_REQUEST:
      return {
        loading: true,
        updatedailyTips: [],
      };

    case UPDATE_DAILYTIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedailyTips: action.payload,
      };

    case UPDATE_DAILYTIPS_FAIL:
      return {
        ...state,
        loading: false,
        updatedailyTips: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
