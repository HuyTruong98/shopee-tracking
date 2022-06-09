import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import OverLayProvider from './components/OverLay/provider';
import { HOME_PAGE, LOGIN_PAGE, NOT_FOUND_PAGE } from './configs';
import ProtectedRoute from './configs/ProtedRouter';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import NotFoundPage from './container/NotFoundPage';
import { ToastContainer } from 'react-toastify';

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

  useEffect(() => {
    localStorage.getItem('ACCESSTOKEN');
    localStorage.getItem('REFRESHTOKEN');
  }, []);
  return (
    <OverLayProvider>
      <ToastContainer />
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
