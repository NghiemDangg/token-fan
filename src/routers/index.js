// Pages
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login';
import ClaimPage from '../pages/ClaimPage/ClaimPage';
import { NotFound } from '../pages/NotFound';

// Public routes
// const publicRoutes = [
//     { path: routes.home, component: Home },
//     { path: routes.login, component: Login },
//     { path: routes.claimPage, component: ClaimPage },
// ];

const privateRoutes = [];

const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/claim',
        element: <ClaimPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
export { publicRoutes, privateRoutes };
