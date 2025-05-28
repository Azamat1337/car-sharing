import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE, CHAT_ROUTE, BLOG_ROUTE, POST_ROUTE,
    ADMIN_CHAT_ROUTE, TAXI_ROUTE,
    ADMIN_TAXI_ROUTE,
    RENTAL_CAR_ROUTE,
    RENTAL_LIST_ROUTE,
    CAR_SHARING_LIST_ROUTE,
    CARSHARING_CAR_ROUTE
} from './infrastructure/routes/index.js';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import UserProfile from './pages/UserProfile.jsx';
import RentalList from './pages/RentalList.jsx';
import RentalCar from "./pages/RentalCar.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import BlogPage from "./pages/Blog.jsx";
import BlogPostPage from "./pages/BlogPost.jsx";
import TaxiListPage from './pages/TaxiList.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Admin from './pages/Admin.jsx';
import AdminChatsPage from './pages/admin/ChatsAdmin.jsx';
import TaxiAdminPage from './pages/admin/TaxiAdmin.jsx';
import CarSharingList from './pages/CarSharingList.jsx';
import CarSharingCar from './pages/CarSharingCar.jsx';

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
        path: RENTAL_LIST_ROUTE,
        element: <RentalList />,
    },
    {
        path: RENTAL_CAR_ROUTE,
        element: <RentalCar />
    },
    {
        path: CAR_SHARING_LIST_ROUTE,
        element: <CarSharingList />,
    },
    {
        path: CARSHARING_CAR_ROUTE,
        element: <CarSharingCar />,
    },
    {
        path: HOME_ROUTE,
        element: <Home />,
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
