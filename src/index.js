import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Message from './components/Message/Message';
import Register from './components/Register/Register';
import Session from './components/Session/Session';
import Social from './components/Social/Social';
import UserProfile from './components/UserProfile/UserProfile';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/message' element={ <Message /> } />
      <Route path='/session' element={ <Session /> } />
      <Route path='/social' element={ <Social /> } />
      <Route path='/profile' element={ <UserProfile /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
