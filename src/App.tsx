
import { createBrowserRouter} from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { Product } from "./pages/product";
import { NewProduct } from "./pages/dashboard/newProduct";

import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/produto/:id",
                element: <Product/>
            },
            {
                path: "/painel-acspet",
                element: <Dashboard/>
            },
            {
                path: "/painel-acspet/registrar-produto",
                element: <NewProduct/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registro",
        element: <Register/>
    }
        
]);

export default router;