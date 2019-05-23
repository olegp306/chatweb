export const LOGIN_REQUEST = 'loginRequest'
export const LOGIN_BY_USERID = 'LOGIN_BY_USERID'

export const IS_LOGGING = 'isLogging'
export const LOGGED = 'logged'
export const LOGIN_FAILED = 'loginFailure'


export const loginByUserId = (userId) => {
    return {
        type: LOGIN_BY_USERID,
        payload: {
            userId, userId            
        }
    }
}


export const login = (user, password) => {
    return {
        type: LOGIN_REQUEST,
        payload: {
            user, 
            password
        }
    }
}

export const isLogging = (isLogging) => {
    return {
        type: IS_LOGGING,
        payload: isLogging
    }
}

export const logged = (session) => {
    return {
        type: LOGGED,
        payload: session
    }
}

export const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}
