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

export const AdminContext = createContext({
    admin: false,
    setAdmin: () => {
    }
});

export const LanguageContext = createContext({
    language: "",
    setLanguage: () => {
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

const AuthProvider = ({children}) => {
    let [auth, setAuth] = useState(false);
    let [admin, setAdmin] = useState(false);
    let [token, setToken] = useState();
    let [loaded, setLoaded] = useState(false);
    let [language, setLanguage] = useState();



    useEffect(() => {
        let bearer = localStorage.getItem("apiBearerToken");
        if (bearer) {
            setToken(bearer);
            axios.defaults.headers.common["Authorization"] = `Bearer ${bearer}`;
        }

        const checkAuth = async () => {
            try {
                let response = await axios.get("/api/is-auth", {headers: {Accept: 'application/json'}});
                if (response.data.success) {
                    setAuth(true);
                    if (response.data.data.role && response.data.data.role === "admin") {
                        console.log("il est admin");
                        setAdmin(true);
                    }
                } else {
                    setAuth(false);
                }
            } catch (e) {
                console.log(e.response.data.errors);
                setAuth(false);
            }
            setLoaded(true);
            setLanguage('fr');
        };
        checkAuth();
    }, []);


    return (
        <>
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AdminContext.Provider value={{ admin, setAdmin }}>
                    <AuthLoadingContext.Provider value={{ loaded, setLoaded }}>
                        <BearerContext.Provider value={{ token, setToken }}>
                            <LanguageContext.Provider value={{ language, setLanguage }}>
                                {children}
                            </LanguageContext.Provider>
                        </BearerContext.Provider>
                    </AuthLoadingContext.Provider>
                </AdminContext.Provider>
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
