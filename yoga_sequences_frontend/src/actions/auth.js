import { AUTHENTICATED, NOT_AUTHENTICATED, BACKEND_USERS_URL } from '../actions';

const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

export const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const thirtyMinutes = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < thirtyMinutes) {
        return localStorage.getItem("token");
    }
}

export const checkAuth = () => {
    let config = {
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }
    return (dispatch) => {
        return fetch(`${BACKEND_USERS_URL}/current_user`, config)
        .then(resp => {
            if (resp.ok) {
                return resp.json().then(user => dispatch({type: AUTHENTICATED, payload: user}))
            } else {
                return Promise.reject(dispatch({type: NOT_AUTHENTICATED}))
            }
        })
    }
}

export const signupUser = (credentials) => {
    let config = {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({user: credentials })
    }
    return (dispatch) => {
        return fetch(`${BACKEND_USERS_URL}/signup`, config)
        .then(resp => {
            if (resp.ok) {
                setToken(resp.headers.get("Authorization"));
                return resp.json()
                .then((userJson =>
                    dispatch({type: AUTHENTICATED, payload: userJson})
                ));
            }
            else {
                return resp.json().then((errors) => {
                    dispatch({type: NOT_AUTHENTICATED});
                    return Promise.reject(errors);
                });
            }
        });
    };
};

export const loginUser = (credentials) => {
    let config = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: credentials })
    };
    return (dispatch) => {
        return fetch(`${BACKEND_USERS_URL}/login`, config)
        .then(resp => {
            if (resp.ok) {
                setToken(resp.headers.get("Authorization"));
                return resp.json()
                .then((userJson) =>
                    dispatch({type:AUTHENTICATED, payload: userJson})
                );
            } else {
                return resp.json().then((errors) => {
                    dispatch({ type: NOT_AUTHENTICATED });
                    return Promise.reject(errors);
                });

            }
        });
    };
};

export const logoutUser = () => {
  return (dispatch) => {
    return fetch(`${BACKEND_USERS_URL}/logout`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": getToken(),
      },
    }).then((res) => {
      if (res.ok) {
        return dispatch({ type: NOT_AUTHENTICATED });
      } else {
        return res.json().then((errors) => {
          dispatch({ type: NOT_AUTHENTICATED });
          return Promise.reject(errors);
        });
      }
    });
  };
};