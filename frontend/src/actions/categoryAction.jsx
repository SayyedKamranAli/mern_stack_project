import {
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    SUB_CATEGORY_REQUEST,
    SUB_CATEGORY_SUCCESS,
    SUB_CATEGORY_FAIL,
    ALL_SUB_CATEGORY_REQUEST,
    ALL_SUB_CATEGORY_SUCCESS,
    ALL_SUB_CATEGORY_FAIL
} from "../constants/categoryConstant";

import axios from "axios";

export const createCategory = (datatosend) => async (dispatch) => {
    console.log('category data in action', datatosend);

    try {

        dispatch({type:CATEGORY_REQUEST})

        const config ={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
       

        const { data } = await axios.post(`/api/V1/categoryCreate`, datatosend, config)
        console.log('data of category in action',data)
        dispatch({type:CATEGORY_SUCCESS , payload:data.category})


    } catch (error) {
        dispatch({ type: CATEGORY_FAIL, payload: error.response.data.message })
    }
}

export const getAllCategory =()=>async(dispatch)=>{

    try {
        dispatch({ type: ALL_CATEGORY_REQUEST })
        const { data } = await axios.get('/api/V1/getallcategory');

        dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data.allcategory });
        
    } catch (error) {
        dispatch({ type: ALL_CATEGORY_FAIL, payload: error.response.data.message })
    }

}



//****************Sub-category section ****************** */

export const createSubCategory = (datatosend) => async (dispatch) => {
    console.log('category data in action', datatosend);

    try {

        dispatch({type:SUB_CATEGORY_REQUEST})

        const config ={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
       

        const { data } = await axios.post(`/api/V1/SubcategoryCreate`, datatosend, config)
        console.log('data of category in action',data)
        dispatch({type:SUB_CATEGORY_SUCCESS , payload:data.category})


    } catch (error) {
        dispatch({ type: SUB_CATEGORY_FAIL, payload: error.response.data.message })
    }
}



export const getAllSubCategory =()=>async(dispatch)=>{

    try {
        dispatch({ type: ALL_SUB_CATEGORY_REQUEST })
        const { data } = await axios.get('/api/V1/getallSubcategory');

        dispatch({ type: ALL_SUB_CATEGORY_SUCCESS, payload: data.allcategory });
        
    } catch (error) {
        dispatch({ type: ALL_SUB_CATEGORY_FAIL, payload: error.response.data.message })
    }

}
