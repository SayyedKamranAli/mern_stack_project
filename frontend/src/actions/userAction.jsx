import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,

    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from "../constants/userConstants";
import axios from "axios"


export const login = (email, password) => async (dispatch) => {


    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`/api/V1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });


    } catch (error) {

        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })

    }
}


//logout

export const logout = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/V1/logout`);
        console.log("message for logout", data.message);
        dispatch({ type: LOGOUT_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

export const register = (name, email, password , interest) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const registerData = {
            name, email, password ,interest
        }
        const { data } = await axios.post(`/api/V1/register`, registerData, config)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
    } catch (error) {

        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })

    }


}




export const loadUser = () => async (dispatch) => {
    try {
        console.log('test_loaduser1');
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/V1/me`);
        console.log('test_loaduser2', data);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {

        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })

    }
}


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get('/api/V1/getAllUsers');

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });

    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
    }

}


export const updateUser = (id, userData) => async (dispatch) => {
    console.log('updated user data', userData);

    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/V1/user/${id}`, userData, config)
        console.log('updated user', data)


        dispatch({ type: UPDATE_USER_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })

    }
}