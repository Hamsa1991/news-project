import {createContext, useContext, useState} from "react"

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState({name: localStorage.getItem("name")});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    const setUser = (user) => {
        _setUser(user);
        console.log("user", user)
        if (user) {
            localStorage.setItem("name", user.name);
        } else {
            localStorage.removeItem("name")
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
