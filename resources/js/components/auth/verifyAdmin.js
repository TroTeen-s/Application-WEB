import { AdminContext, AuthLoadingContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useContext, useLayoutEffect } from "react";

const verifyAdmin = () => {
    let { admin } = useContext(AdminContext);
    let { loaded } = useContext(AuthLoadingContext);
    let navigate = useNavigate();

    useLayoutEffect(() => {
        if (loaded) {
            if (!admin) {
                return navigate("/");
            }
        }
    }, [admin, loaded]);
};

export default verifyAdmin;

