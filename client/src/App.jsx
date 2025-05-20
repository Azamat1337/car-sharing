import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {checkAuthRequest} from "./infrastructure/redux/user/slice.js";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthRequest());
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
