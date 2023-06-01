import * as api from '../api/index.js'
import {AUTH,ERROR} from '../constants/actionTypes'


export const signin = (formData,history) => async(dispatch) => {
    try{

        const {data} = await api.signin(formData)

        dispatch({ type: AUTH, data});
        if(data.subscribed == true)
            history.push('/')
        else
            history.push('subscription')

    } catch(error){
        dispatch({type: ERROR, payload:error.response.data.error})

    }
}

export const signup = (formData,history) => async(dispatch) => {
    try{
        const {data} = await api.signup(formData)

        dispatch({type:AUTH, data})

        history.push("/")

    } catch(error){
        dispatch({type: ERROR, payload:error.response.data.error})
    }
}