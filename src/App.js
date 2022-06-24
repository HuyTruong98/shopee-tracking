import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import OverLayProvider from './components/OverLay/provider';
import routesMap from './routes/routesMap';

function App() {
  return (
    <OverLayProvider>
      <ToastContainer />
      <Router>
        <Routes>
          {routesMap.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Router>
    </OverLayProvider>
  );
}

export default App;
