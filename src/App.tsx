
import { createBrowserRouter} from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { Product } from "./pages/product";
import { NewProduct } from "./pages/dashboard/newProduct";

import { Layout } from "./components/layout";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/produto/:type/:id",
                element: <Product/>
            },
            {
                path: "/painel-acspet",
                element: <Private><Dashboard/></Private>
            },
            {
                path: "/painel-acspet/registrar-produto",
                element: 
                    <Private><NewProduct/></Private>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registrar",
        element: <Register/>
    }
        
]);

export default router;