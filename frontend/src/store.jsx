import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer, allUserReducers, profileReducer } from './reducers/userReducer'
import { intrestReducer, allIntrestReducer, updateIntrestReducer } from './reducers/intrestReducer'
import { allQuizReducer, quizReducer } from "./reducers/dailyQuizReducer";
import { createCategoryReducer, allCategoryReducer ,createSubCategoryReducer,allSubCategoryReducer} from "./reducers/categoryReducer"
import { dailyTipsReducer,allDailyTipsReducer ,updateDailyTipsReducer} from "./reducers/dailyTipsReducer";
import { blogReducer, allBlogReducer,updateBlogReducer } from "./reducers/blogReducer";
import { blockWordsReducer, allBlockWordsReducer,updateBlockWordsReducer } from "./reducers/blockWordsReducer";
import { exerciseReducer,allExerciseReducer,updateExerciseReducer } from "./reducers/exercise_or_meditationReducer";
const reducer = combineReducers({
    user: userReducer,
    interest: intrestReducer,
    allinterest: allIntrestReducer,
    allUsers: allUserReducers,
    updateinterest: updateIntrestReducer,
    profile: profileReducer,
    addquiz:quizReducer,
    quiz: allQuizReducer,
    category: createCategoryReducer,
    allcategory: allCategoryReducer,
    subcategory:createSubCategoryReducer,
    allsubcategory:allSubCategoryReducer,
    alldailytips:allDailyTipsReducer,
    dailytips:dailyTipsReducer,
    blog:blogReducer,
    allblog:allBlogReducer,
    updateblog:updateBlogReducer,
    blockwords:blockWordsReducer,
    allblockwords:allBlockWordsReducer,
    updateblockwords:updateBlockWordsReducer,
    updatedailytips:updateDailyTipsReducer,
    exercise:exerciseReducer,
    allexercise:allExerciseReducer,
    updateexercise:updateExerciseReducer
})

// hello
const middleware = [thunk];

// const store = legacy_createStore(reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware)));
const store = legacy_createStore(reducer,

    composeWithDevTools(applyMiddleware(...middleware)));

export default store;