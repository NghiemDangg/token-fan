import routes from "./routers";

// Pages
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login";

// Public routes
const publicRoutes = [
    { path: routes.home, component: Home},
    { path: routes.login, component: Login},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
