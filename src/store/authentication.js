import { baseUrl } from '../config';

export const TOKEN_KEY = 'user/authentication/token';
export const SET_TOKEN = 'user/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'user/authentication/REMOVE_TOKEN';
export const SET_AVATAR_URL = 'user/authentication/SET_AVATAR';
export const REMOVE_AVATAR_URL = 'user/authentication/REMOVE_AVATAR';
export const SET_USER_NAME = 'user/authentication/SET_USER_NAME';
export const REMOVE_USER_NAME = 'user/authentication/REMOVE_USER_NAME';
export const SET_USER_EMAIL = 'user/authentication/SET_USER_EMAIL';
export const REMOVE_USER_EMAIL = 'user/authentication/REMOVE_USER_EMAIL';
export const SET_USER_ID = 'user/authentication/SET_USER_ID';
export const REMOVE_USER_ID = 'user/authentication/REMOVE_USER_ID';

//actions
export const removeToken = token => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });
export const removeAvatarURL = () => ( {type: REMOVE_AVATAR_URL});
export const setAvatarURL = avatarURL => ({ type: SET_AVATAR_URL, avatarURL});
export const removeUserName = () => ({ type: REMOVE_USER_NAME })
export const setUserName = name => ({ type: SET_USER_NAME, name});
export const removeUserEmail = () => ({type: REMOVE_USER_EMAIL});
export const setUserEmail = emailAddress => ({ type: SET_USER_EMAIL, emailAddress});
export const removeUserId = () => ({ type: REMOVE_USER_ID });
export const setUserId = id => ({ type: SET_USER_ID, id})

//thunks
export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};




export const getUserInfo = (emailAddress) => async dispatch => {
  console.log("getUserInfo received email:  ", emailAddress);
    const response = await fetch(`${baseUrl}/users/avatarInfo`, {
       method: 'post',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({emailAddress}),
    });

    if (response.ok) {
        const {avatarURL, name} = await response.json();
        dispatch(setAvatarURL(avatarURL));
        dispatch(setUserName(name.split(" ")[0]));
    }
};

export const logout = () => async (dispatch) => {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken());

}

// just a function
export const getToken = async (emailAddress, password) => {
  console.log("getToken received email:  ", emailAddress, " and password: ", password);
    const response = await fetch(`${baseUrl}/users/token`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({emailAddress, password}),
    });

    if (response.ok) {
        const { token } = await response.json();
        window.localStorage.setItem("token", token);
        return token;
    }
};

//reducers
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }

    case SET_AVATAR_URL: {
        const newState = { ...state };
        newState.avatarURL = action.avatarURL;
        return newState;
    }

    case REMOVE_AVATAR_URL: {
      const newState = { ...state};
      delete newState.avatarURL;
      return newState;
    }

    case SET_USER_NAME: {
        const newState = { ...state };
        newState.name = action.name;
        return newState;
    }

    case REMOVE_USER_NAME: {
      const newState = { ...state };
      delete newState.name;
      return newState;
    }

    case SET_USER_EMAIL: {
      const newState = { ...state };
      newState.emailAddress = action.emailAddress;
      return newState;
    }

    case REMOVE_USER_EMAIL: {
      const newState = { ...state};
      delete newState.emailAddress;
      return newState;
    }

    case SET_USER_ID: {
      const newState = { ...state};
      newState.userId = action.id;
      return newState;
    }

    case REMOVE_USER_ID: {
      const newState = { ...state};
      delete newState.userId;
      return newState;
    }

    default: return state;
  }
}
