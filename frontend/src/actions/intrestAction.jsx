import {  INTREST_REQUEST,
    INTREST_SUCCESS,
    INTREST_FAIL,
    INTREST_FAIL_UPDATE,
    INTREST_SUCCESS_UPDATE,
    INTREST_REQUEST_UPDATE, 
GETALL_INTREST_FAIL,
GETALL_INTREST_REQUEST,GETALL_INTREST_SUCCESS} from "../constants/interestConstant";
import axios from "axios"

export const addIntrest = (name, status) => async (dispatch) => {


    try {
        dispatch({ type: INTREST_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`/api/V1/interestAdd`, { name, status }, config);

        dispatch({ type: INTREST_SUCCESS, payload: data });


    } catch (error) {

        dispatch({ type: INTREST_FAIL, payload: error.response.data.message })

    }
}
export const getIntrest = () => async (dispatch) => {


    try {
        dispatch({ type: GETALL_INTREST_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.get(`/api/V1/allInterest`,  config);
      
        dispatch({ type: GETALL_INTREST_SUCCESS, payload: data.allInterests });


    } catch (error) {

        dispatch({ type: GETALL_INTREST_FAIL, payload: error.response.data.message })

    }
}
export const updateIntrest = (data) => async (dispatch) => {
    const {id, name, status}= data;

    try {
        dispatch({ type: INTREST_REQUEST_UPDATE });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/V1/updateInterest/${id}`, {name:name}, config);

        dispatch({ type: INTREST_SUCCESS_UPDATE, payload: data });


    } catch (error) {

        dispatch({ type: INTREST_FAIL_UPDATE, payload: error.response.data.message })

    }
}