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
} from '../constants/categoryConstant'

export const createCategoryReducer = (state = { category: {} }, action) => {

    switch (action.type) {
        case CATEGORY_REQUEST:

            return {
                loading: true,
                isAuthenticated: false
            }
        case CATEGORY_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                category: action.payload
            }
        case CATEGORY_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload

            }

        default:
            return state
    }
}


export const allCategoryReducer = (state = { categories: [] }, action) => {

    switch (action.type) {
        case ALL_CATEGORY_REQUEST:

            return {
                ...state,
                loading: true
            }
        case ALL_CATEGORY_SUCCESS:

            return {
                ...state,
                loading: false,
                categories: action.payload
            }

        case ALL_CATEGORY_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}


// ******************Sub - category reducers ********************* //



export const createSubCategoryReducer = (state = { category: {} }, action) => {

    switch (action.type) {
        case SUB_CATEGORY_REQUEST:

            return {
                loading: true,
                isAuthenticated: false
            }
        case SUB_CATEGORY_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                category: action.payload
            }
        case SUB_CATEGORY_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload

            }

        default:
            return state
    }
}



export const allSubCategoryReducer = (state = { subcategories: [] }, action) => {

    switch (action.type) {
        case ALL_SUB_CATEGORY_REQUEST:

            return {
                ...state,
                loading: true
            }
        case ALL_SUB_CATEGORY_SUCCESS:

            return {
                ...state,
                loading: false,
                subcategories: action.payload
            }

        case ALL_SUB_CATEGORY_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}