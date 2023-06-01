import * as api from '../api'
import {LOADING, VARIABLE} from '../constants/actionTypes'



export const fetchLoading = (data) => async(dispatch) => {
    try{
        console.log(data)
        dispatch({type: 'LOADING', payload: data})
    }catch(error){
        console.log(error)
    }
}


export const fetchVariable = (data) => async(dispatch) => {
    try{
        dispatch({type: VARIABLE, payload:data})
    }
    catch(error){
        console.log(error)
    }
}