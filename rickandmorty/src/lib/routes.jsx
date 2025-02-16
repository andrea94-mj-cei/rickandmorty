import { createBrowserRouter } from "react-router-dom";

//páginas
import LandingPage from "@/pages/LandingPage";
import Personajes from "@/pages/Personajes";
import Episodios from "@/pages/Episodios";
import Lugares from "@/pages/Lugares";


//páginas especiales
import App from "@/App";


const router = createBrowserRouter([{
    path: "/",
    element: <App />,

    children: [
        {
            index:true,
            element: <LandingPage />
        },
        {
            path: "personajes",
            element: <Personajes />
        },
        {
            path: "episodios",
            element: <Episodios />
        },
        {
            path: "lugares",
            element: <Lugares />
        }
    ]
}]);


export default router;