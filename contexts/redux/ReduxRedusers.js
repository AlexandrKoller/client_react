import { SET_TOKEN, SET_USERNAME, SET_LAST_NAME, SET_FIRST_NAME, SET_EMAIL, SET_IS_STAFF, SET_ALL, SET_FILE_COUNT } from "./ReduxMiddlewareActions";

let initialState = {
    token: '',
    username: '',
    last_name: '',
    fist_name: '',
    email: '',
    is_staff: false,
    file_count: 0
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return{
                ...state,
                token: action.payload
            }
        case SET_USERNAME:
            return{
                ...state,
                username: action.payload
            }
        case SET_FIRST_NAME:
            return{
                ...state,
                first_name: action.payload
            }
        case SET_LAST_NAME:
            return{
                ...state,
                last_name: action.payload
            }
        case SET_EMAIL:
            return{
                ...state,
                email: action.payload
            }
        case SET_FILE_COUNT:
            return{
                ...state,
                file_count: action.payload
            }
        case SET_IS_STAFF:
            return{
                ...state,
                is_staff: action.payload
            }
        case SET_ALL:
            return {
                ...state, 
                token: action.payload.token,
                username: action.payload.username,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                is_staff: action.payload.is_staff
            }
        default:
            return state
    }
}