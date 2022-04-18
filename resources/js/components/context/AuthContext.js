import {createContext, useState} from "react";

export const AuthContext = createContext({
    auth: '',
    setAuth: () => {
    },
})

const AuthProvider = ({children}) => {
    let [auth, setAuth] = useState(false)
    return (
        <>
            <AuthContext.Provider value={{auth,setAuth}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider
