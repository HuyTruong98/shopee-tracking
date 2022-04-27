import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { HOME_PAGE, LOGIN_PAGE, NOT_FOUND_PAGE } from './configs';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import NotFoundPage from './container/NotFoundPage';
import ProtectedRoute from './configs/ProtedRouter';
import OverLayProvider from './components/OverLay/provider';

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
        <ProtectedRoute>
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
    <OverLayProvider>
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
    </OverLayProvider>
  );
}

export default App;
