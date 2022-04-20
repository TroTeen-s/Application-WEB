import {createContext, useEffect, useState} from "react";

export const BearerContext = createContext({
    token: '',
    setToken: () => {
    },
})

export const AuthContext = createContext({
    auth: '',
    setAuth: () => {
    },
})

const AuthProvider = ({children}) => {
    let [auth, setAuth] = useState(false)
    let [token, setToken] = useState()

    useEffect(() => {
        let bearer = localStorage.getItem('apiBearerToken')
        if (bearer) {
            setToken(bearer)
            axios.defaults.headers.common['Authorization'] = `Bearer ${bearer}`
        }
        const checkAuth = async () => {
            try {
                let response = await axios.get("/api/is-auth", {headers: {Accept: 'application/json'}})
                if (response.data.success) {
                    setAuth(true)
                } else {
                    setAuth(false)
                }
            } catch (e) {
                console.log(e.response.data.errors)
                return false
            }
        }
        checkAuth()
    }, [])
    return (
        <>
            <AuthContext.Provider value={{auth, setAuth}}>
                <BearerContext.Provider value={{token, setToken}}>
                    {children}
                </BearerContext.Provider>
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider
