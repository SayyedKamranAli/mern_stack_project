import {  BLOCKWORDS_REQUEST,
    BLOCKWORDS_SUCCESS,
    BLOCKWORDS_FAIL,
    GETALL_BLOCKWORDS_REQUEST,
    GETALL_BLOCKWORDS_SUCCESS,
    GETALL_BLOCKWORDS_FAIL, 
    UPDATE_BLOCKWORDS_REQUEST,
    UPDATE_BLOCKWORDS_SUCCESS,
    UPDATE_BLOCKWORDS_FAIL} from "../constants/blockwordsConstant";
import axios from "axios"

export const createBlockWords = (datatosend) => async (dispatch) => {


    try {
        dispatch({ type: BLOCKWORDS_REQUEST });
        const config = {
            headers: {                
                 "Content-Type": "application/json"
                //'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post(`/api/V1/createBlockWords`,datatosend, config);

        dispatch({ type: BLOCKWORDS_SUCCESS, payload: data });


    } catch (error) {

        dispatch({ type: BLOCKWORDS_FAIL, payload: error.response.data.message })

    }
}
export const getAllBlockWords = () => async (dispatch) => {


    try {
        dispatch({ type: GETALL_BLOCKWORDS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.get(`/api/V1/getAllBlockWords`,  config);
         console.log("data",data)
        dispatch({ type: GETALL_BLOCKWORDS_SUCCESS, payload: data });


    } catch (error) {

        dispatch({ type: GETALL_BLOCKWORDS_FAIL, payload: error.response.data.message })

    }
}
export const updateBlockWords = (data) => async (dispatch) => {
    const {id, words,status}= data;

    try {
        dispatch({ type: UPDATE_BLOCKWORDS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/V1/updateBlockWordst/${id}`, { words:words ,status:status}, config);

        dispatch({ type: UPDATE_BLOCKWORDS_SUCCESS, payload: data });


    } catch (error) {

        dispatch({ type: UPDATE_BLOCKWORDS_FAIL, payload: error.response.data.message })

    }
}