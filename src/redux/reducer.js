const initialState = {
    username: "",
    profilePic: ""
}

const UPDATE_USER = "UPDATE_USER"
const LOGOUT_USER = "LOGOUT_USER"

export const updateUser = (userObj) => {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
  }

  export const logout = () => {
    return {
        type: LOGOUT_USER
    }
  }

  export default function reducer(state = initialState, action) {
    switch (action.type) {
          case UPDATE_USER:
              return {...state, username: action.payload.username, profilePic: action.payload.profilePic}
          case LOGOUT_USER:
              return {...state, initialState}
          default:
              return state
    }
}