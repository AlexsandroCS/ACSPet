// react e react router dom.
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

// Context de autenticação de login.
import { AuthContext } from "../contexts/AuthContext";

interface PrivateProps{
    children: ReactNode;
}

export function Private({children}: PrivateProps): any{

    const {signed, loadingAuth} = useContext(AuthContext);

    if(loadingAuth){
        // Atualizar para um spinner.
        return <div></div>
    }

    if (!signed) {
        return <Navigate to={"/login"}/>
    }

    return children;
}

