import {  BLOG_REQUEST,
    BLOG_SUCCESS,
    BLOG_FAIL,
    GETALL_BLOG_REQUEST,
    GETALL_BLOG_SUCCESS,
    GETALL_BLOG_FAIL, 
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL} from "../constants/blogConstant";
    export const blogReducer = (state = { blog: {} }, action) => {
        switch (action.type) {
          case BLOG_REQUEST:
            return {
              ...state,
              loading: true,
            };
      
          case BLOG_SUCCESS:
            return {
              ...state,
              loading: false,
              blog: action.payload.data,
            };
      
          case BLOG_FAIL:
            return {
              ...state,
              loading: false,
              blog: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };
      export const allBlogReducer = (state = { blog: [] }, action) => {
        switch (action.type) {
          case GETALL_BLOG_REQUEST:
            return {
              loading: true,
              blog: [],
            };
      
          case GETALL_BLOG_SUCCESS:
            return {
              ...state,
              loading: false,
              blog: action.payload,
            };
      
          case GETALL_BLOG_FAIL:
            return {
              ...state,
              loading: false,
              blog: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };
      export const updateBlogReducer = (state = { updateblog: [] }, action) => {
        switch (action.type) {
          case UPDATE_BLOG_REQUEST:
            return {
              loading: true,
              updateblog: [],
            };
      
          case UPDATE_BLOG_SUCCESS:
            return {
              ...state,
              loading: false,
              updateblog: action.payload,
            };
      
          case UPDATE_BLOG_FAIL:
            return {
              ...state,
              loading: false,
              updateblog: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };