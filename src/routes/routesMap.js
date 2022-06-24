/* eslint-disable import/no-anonymous-default-export */
import LoginPage from '../container/LoginPage';
import HomePage from '../container/HomePage';
import NotFoundPage from '../container/NotFoundPage';
import ProtectedRoute from '../configs/ProtedRouter';

import r from './routes';

export default [
  {
    exact: true,
    path: r.LOGIN_PAGE,
    element: <LoginPage />,
  },
  {
    exact: true,
    path: r.HOME_PAGE,
    element: (
      <ProtectedRoute pathRedirect={r.LOGIN_PAGE}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: r.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
];
