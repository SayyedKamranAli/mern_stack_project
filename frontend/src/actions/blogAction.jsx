import { toast } from "react-toastify";
import {  BLOG_REQUEST,
    BLOG_SUCCESS,
    BLOG_FAIL,
    GETALL_BLOG_REQUEST,
    GETALL_BLOG_SUCCESS,
    GETALL_BLOG_FAIL, 
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL} from "../constants/blogConstant";
import axios from "axios"

export const addBlog = (datatosend) => async (dispatch) => {


    try {
        dispatch({ type: BLOG_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post(`/api/V1/createBlog`,datatosend, config);

        dispatch({ type: BLOG_SUCCESS, payload: data });


    } catch (error) {

        dispatch({ type: BLOG_FAIL, payload: error.response.data.message })

    }
}
export const getBlog = () => async (dispatch) => {


    try {
        dispatch({ type: GETALL_BLOG_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.get(`/api/V1/getAllBlog`,  config);
      
        dispatch({ type: GETALL_BLOG_SUCCESS, payload: data });


    } catch (error) {

        dispatch({ type: GETALL_BLOG_FAIL, payload: error.response.data.message })

    }
}
export const updateBlog = (data) => async (dispatch) => {
    const {id, title, description}= data;

    try {
        dispatch({ type: UPDATE_BLOG_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/V1/updateBlog/${id}`, {title:title, description:description}, config);


        dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data });
        toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:3000
          });


    } catch (error) {

        dispatch({ type: UPDATE_BLOG_FAIL, payload: error.response.data.message })

    }
}
