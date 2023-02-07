import { Routes, Route } from 'react-router-dom';
import { Path } from '../Utilities/Enums';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRouter = () => {
    return (
        <Routes>
            <Route path={Path.Home} element={<Home />} />
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.Register} element={<Register />} />
        </Routes>
    );
};

export default AppRouter;
