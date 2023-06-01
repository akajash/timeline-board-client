import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE,SET_PAGE} from '../constants/actionTypes'

export const fetchExpenses = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchExpenses(page);
        
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: SET_PAGE, payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const fetchExpenseByProject = (id,page) => async(dispatch) => {
    try{
        const {data} = await api.fetchExpenseByProject(id,page);
        
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: SET_PAGE, payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}


export const createExpense = (task) => async(dispatch) => {
    try{
        const {data} = await api.createExpense(task)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateExpense = (id,task) => async(dispatch) => {
    try{
        const {data} = await api.updateExpense(id,task);
        console.log(data)
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteExpense = (id) => async(dispatch) => {
    try{
        await api.deleteExpense(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
