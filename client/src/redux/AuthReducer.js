import {createContext, useEffect, useReducer} from "react"

export const INITIAL_STATE = {
    user: localStorage.getItem("user") !== "undefined"?
        JSON.parse(localStorage.getItem("user")) || null
        : null,
    loading: false,
    error: null
}

export const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}