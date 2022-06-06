import { createContext, useEffect, useState } from "react";

export const BearerContext = createContext({
    token: "",
    setToken: () => {
    }
});

export const AuthContext = createContext({
    auth: false,
    setAuth: () => {
    }
});

/**
 * Permet d'attendre que la vérification d'authentification ait eu lieu avant de continuer sur des Accueil protégées
 */
export const AuthLoadingContext = createContext({
    loaded: false,
    setLoaded: () => {
    }
});

const AuthProvider = ({ children }) => {
    let [auth, setAuth] = useState(false);
    let [token, setToken] = useState();
    let [loaded, setLoaded] = useState(false);


    useEffect(() => {
        let bearer = localStorage.getItem("apiBearerToken");
        if (bearer) {
            setToken(bearer);
            axios.defaults.headers.common["Authorization"] = `Bearer ${bearer}`;
        }

        const checkAuth = async () => {
            try {
                let response = await axios.get("/api/is-auth", { headers: { Accept: "application/json" } });
                if (response.data.success) {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            } catch (e) {
                console.log(e.response.data.errors);
                setAuth(false);
            }
            setLoaded(true);
        };
        checkAuth();
    }, []);


    return (
        <>
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AuthLoadingContext.Provider value={{ loaded, setLoaded }}>
                    <BearerContext.Provider value={{ token, setToken }}>
                        {children}
                    </BearerContext.Provider>
                </AuthLoadingContext.Provider>
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
