import {
  DAILYQUIZ_REQUEST,
  DAILYQUIZ_SUCCESS,
  DAILYQUIZ_FAIL,
  GET_DAILYQUIZ_REQUEST,
  GET_DAILYQUIZ_SUCCESS,
  GET_DAILYQUIZ_FAIL,
} from "../constants/dailyQuizConstant";
import axios from "axios";

export const addQuiz = (datatosend) => async (dispatch) => {
  try {
    dispatch({ type: DAILYQUIZ_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/V1/addquiz`, datatosend, config);

    dispatch({ type: DAILYQUIZ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAILYQUIZ_FAIL, payload: error.response.data.message });
  }
};

export const getQuiz = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DAILYQUIZ_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/V1/dailyquizmcq`, config);

    dispatch({ type: GET_DAILYQUIZ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DAILYQUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};
