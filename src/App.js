import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import RouterPage from './routers';

function App() {
  return (
    <div>
      <RouterPage />
      <Toaster />
    </div>
  );
}

export default App;
