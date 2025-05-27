import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    CAR_LIST_ROUTE,
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    RENTAL_ROUTE,
    USER_ROUTE, CAR_PAGE_ROUTE, CHAT_ROUTE, BLOG_ROUTE, POST_ROUTE,
    ADMIN_CHAT_ROUTE, TAXI_ROUTE,
    ADMIN_TAXI_ROUTE
} from './infrastructure/routes/index.js';
import Admin from './pages/Admin.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Rental from './pages/Rental.jsx';
import Home from './pages/Home.jsx';
import UserProfile from './pages/UserProfile.jsx';
import CarList from './pages/CarList.jsx';
import CarPage from "./pages/CarPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import AdminChatsPage from './pages/admin/ChatsAdmin.jsx';
import BlogPage from "./pages/Blog.jsx";
import BlogPostPage from "./pages/BlogPost.jsx";
import TaxiListPage from './pages/TaxiList.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import TaxiAdminPage from './pages/admin/TaxiAdmin.jsx';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: (
            <ProtectedRoute>
                <Admin />
            </ProtectedRoute>
        )
    },
    {
        path: USER_ROUTE,
        element: <UserProfile />,
    },
    {
        path: CHAT_ROUTE,
        element: <ChatPage />
    },
    {
        path: ADMIN_CHAT_ROUTE,
        element: (
            <ProtectedRoute>
                <AdminChatsPage />
            </ProtectedRoute>
        )
    },
    {
        path: TAXI_ROUTE,
        element: <TaxiListPage />
    },
    {
        path: ADMIN_TAXI_ROUTE,
        element: (
            <ProtectedRoute>
                <TaxiAdminPage />
            </ProtectedRoute>
        )
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
