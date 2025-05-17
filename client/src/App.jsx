import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import {Provider} from "react-redux";
import store from './infrastructure/redux/store.js'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>

    );
}

export default App;
