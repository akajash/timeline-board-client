import {combineReducers} from 'redux'
import posts from './posts'
import authReducer from './auth'
import projects from './projects'
import workforce from './workforce'
import tasks from "./tasks.js"
import page from "./page.js"
import error from "./error.js"
import designation from "./designation.js"
import data from "./data.js";
import loading from './loading'

export default combineReducers({
    posts,
    authReducer,
    projects,
    workforce,
    tasks,
    page,
    error,
    designation,
    data,
    loading
})