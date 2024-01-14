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
import axios from "axios";

export const addDailyTips = (datareceived) => async (dispatch) => {
  try {
    dispatch({ type: DAILYTIPS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/V1/dailytips`,
      datareceived,
      config
    );

    dispatch({ type: DAILYTIPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAILYTIPS_FAIL, payload: error.response.data.message });
  }
};

export const getDailyTips = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DAILYTIPS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/V1/alldailytips`, config);

    dispatch({ type: ALL_DAILYTIPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_DAILYTIPS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateDailyTips = (data) => async (dispatch) => {
  const {id, title, description}= data;

  try {
      dispatch({ type: UPDATE_DAILYTIPS_REQUEST });
      const config = {
          headers: {
              "Content-Type": "application/json"
          }
      };
      const { data } = await axios.put(`/api/V1/updatedailyTips/${id}`, {title:title, description:description}, config);


      dispatch({ type: UPDATE_DAILYTIPS_SUCCESS, payload: data });
      // toast.success(data?.message, {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose:3000
      //   });


  } catch (error) {

      dispatch({ type: UPDATE_DAILYTIPS_FAIL, payload: error.response.data.message })

  }
}