import {AuthContext, AuthLoadingContext} from "../context/AuthContext";
import {useNavigate} from "react-router";
import {useContext, useLayoutEffect} from "react";

const verifyAuth = () => {
    let {auth} = useContext(AuthContext);
    let {loaded} = useContext(AuthLoadingContext);
    let navigate = useNavigate();

    useLayoutEffect(() => {
        if (loaded) {
            if (!auth) {
                return navigate('/');
            }
        }
    }, [auth, loaded]);
}

export default verifyAuth

