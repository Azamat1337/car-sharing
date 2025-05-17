import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    CAR_LIST_ROUTE,
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    RENTAL_ROUTE,
    USER_ROUTE, CAR_PAGE_ROUTE, CHAT_ROUTE, BLOG_ROUTE, POST_ROUTE,
} from './infrastructure/routes/index.js';
import Admin from './pages/Admin.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Rental from './pages/Rental.jsx';
import Home from './pages/Home.jsx';
import UserProfile from './pages/UserProfile.jsx';
import CarList from './pages/CarList.jsx';
import CarPage from "./pages/CarPage.jsx";
import AdminChatPage from "./pages/ChatPage.jsx";
import BlogPage from "./pages/Blog.jsx";
import BlogPostPage from "./pages/BlogPost.jsx";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />,
    },
    {
        path: USER_ROUTE,
        element: <UserProfile />,
    },
    {
        path: CHAT_ROUTE,
        element: <AdminChatPage />
    }
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <SignIn />,
    },
    {
        path: REGISTRATION_ROUTE,
        element: <SignUp />,
    },
    {
        path: CAR_LIST_ROUTE,
        element: <CarList />,
    },
    {
        path: RENTAL_ROUTE,
        element: <Rental />,
    },
    {
        path: HOME_ROUTE,
        element: <Home />,
    },
    {
        path: CAR_PAGE_ROUTE,
        element: <CarPage />
    },
    {
        path: BLOG_ROUTE,
        element: <BlogPage />
    },
    {
        path: POST_ROUTE,
        element: <BlogPostPage />
    }
];
