import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE, NOT_FOUND_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import NotFoundPage from './container/NotFoundPage';
import ProtectedRoute from './configs/ProtedRouter';

function App() {
  const r = [
    {
      exact: true,
      path: LOGIN_PAGE,
      element: <LoginPage />,
    },
    {
      exact: true,
      path: HOME_PAGE,
      element: (
        <ProtectedRoute pathRedirect={LOGIN_PAGE}>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: NOT_FOUND_PAGE,
      element: <NotFoundPage />,
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          {r.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              element={route.element}
            />
          ))}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
