import { Routes, Route, Navigate } from 'react-router-dom';
import { Path } from '../utilities/enums';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RequireAuthenticated from './hoc/RequireAuthenticated';
import WithWebSocketConnection from './hoc/WithWebSocketConnection';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={Path.Home} />} />
      <Route
        index
        path={Path.Home}
        element={(
          <RequireAuthenticated>
            <WithWebSocketConnection>
              <Home />
            </WithWebSocketConnection>
          </RequireAuthenticated>
        )}
      />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.Register} element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
