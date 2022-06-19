import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import OverLayProvider from './components/OverLay/provider';
import { HOME_PAGE, LOGIN_PAGE, NOT_FOUND_PAGE } from './configs';
import ProtectedRoute from './configs/ProtedRouter';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import NotFoundPage from './container/NotFoundPage';

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
