import { toast } from "react-toastify";
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
import axios from "axios";

export const addExercise = (datatosend) => async (dispatch) => {
  try {
    dispatch({ type: EXERCISE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`/api/V1/createExercise`, datatosend, config);

    dispatch({ type: EXERCISE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXERCISE_FAIL, payload: error.response.data.message });
  }
};
export const getExercise = () => async (dispatch) => {
  try {
    dispatch({ type: GETALL_EXERCISE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/V1/getAllExercise`, config);

    dispatch({ type: GETALL_EXERCISE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GETALL_EXERCISE_FAIL, payload: error.response.data.message });
  }
};
export const updateExercise = (data) => async (dispatch) => {
  const { id, title, description } = data;

  try {
    dispatch({ type: UPDATE_EXERCISE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/V1/updateExercise/${id}`,
      { title: title, description: description },
      config
    );

    dispatch({ type: UPDATE_EXERCISE_SUCCESS, payload: data });
    toast.success(data?.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  } catch (error) {
    dispatch({ type: UPDATE_EXERCISE_FAIL, payload: error.response.data.message });
  }
};
