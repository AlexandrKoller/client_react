import { SET_TOKEN, SET_USERNAME, SET_LAST_NAME, SET_FIRST_NAME, SET_EMAIL, SET_IS_STAFF, SET_ALL, SET_FILE_COUNT } from "./ReduxMiddlewareActions"


export function addToken(token) {
    return {type: SET_TOKEN, payload: token};
    }

export function addUsername(username) {
    return {type: SET_USERNAME, payload: username};
    }

export function addLastname(last_name) {
    return {type: SET_LAST_NAME, payload: last_name};
    }

export function addFirstname(first_name) {
    return {type: SET_FIRST_NAME, payload: first_name};
    }

export function addEmail(email) {
    return {type: SET_EMAIL, payload: email};
    }
    
export function changeIS_STAFF(is_staff) {
    return {type: SET_IS_STAFF, payload: is_staff};
    }

export function setALL(user, token) {
    return {type: SET_ALL, payload: {...user, ...token}};
    }

export function setFILE_COUNT(file_count) {
    return {type: SET_FILE_COUNT, payload: file_count};
        }