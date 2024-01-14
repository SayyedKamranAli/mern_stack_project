import {  BLOCKWORDS_REQUEST,
    BLOCKWORDS_SUCCESS,
    BLOCKWORDS_FAIL,
    GETALL_BLOCKWORDS_REQUEST,
    GETALL_BLOCKWORDS_SUCCESS,
    GETALL_BLOCKWORDS_FAIL, 
    UPDATE_BLOCKWORDS_REQUEST,
    UPDATE_BLOCKWORDS_SUCCESS,
    UPDATE_BLOCKWORDS_FAIL} from "../constants/blockwordsConstant";

    export const blockWordsReducer = (state = { blockWords: {} }, action) => {
        switch (action.type) {
          case BLOCKWORDS_REQUEST:
            return {
              ...state,
              loading: true,
            };
      
          case BLOCKWORDS_SUCCESS:
            return {
              ...state,
              loading: false,
              blockwords: action.payload.data,
            };
      
          case BLOCKWORDS_FAIL:
            return {
              ...state,
              loading: false,
              blockwords: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };
      export const allBlockWordsReducer = (state = { blockwords: [] }, action) => {
        switch (action.type) {
          case GETALL_BLOCKWORDS_REQUEST:
            return {
              loading: true,
              blockwords: [],
            };
      
          case GETALL_BLOCKWORDS_SUCCESS:
            return {
              ...state,
              loading: false,
              blockwords: action.payload,
            };
      
          case GETALL_BLOCKWORDS_FAIL:
            return {
              ...state,
              loading: false,
              blockwords: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };

      export const updateBlockWordsReducer = (state = { blockwords: [] }, action) => {
        switch (action.type) {
          case UPDATE_BLOCKWORDS_REQUEST:
            return {
              loading: true,
              blockwords: [],
            };
      
          case UPDATE_BLOCKWORDS_SUCCESS:
            return {
              ...state,
              loading: false,
              blockwords: action.payload,
            };
      
          case UPDATE_BLOCKWORDS_FAIL:
            return {
              ...state,
              loading: false,
              blockwords: [],
              error: action.payload,
            };
          default:
            return state;
        }
      };