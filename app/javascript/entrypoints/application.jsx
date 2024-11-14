import React from 'react';
import ReactDOM from 'react-dom/client';
import './application.css';
import HomePage from '../../frontend/components/HomePage'; // Путь к компоненту
import Registration from '../../frontend/components/Registration'; // Путь к компоненту
import LogInPage from '../../frontend/components/LogInPage'; // Путь к компоненту
import MyProfile from '../../frontend/components/MyProfile.jsx'; // Путь к компоненту

document.addEventListener('DOMContentLoaded', () => {
  const homeElement = document.getElementById('home-page'); // id элемента, куда будет вставляться компонент
  if (homeElement) {
    const root = ReactDOM.createRoot(homeElement);  // Используем createRoot вместо render
    root.render(<HomePage />);  // Монтируем компонент
  }

  const registrationElement = document.getElementById('registration-page');
  if (registrationElement) {
    const root = ReactDOM.createRoot(registrationElement);  // Используем createRoot
    root.render(<Registration />);  // Монтируем компонент
  }

  const logInElement = document.getElementById('logIn-page');
  if (logInElement) {
    const root = ReactDOM.createRoot(logInElement);  // Используем createRoot
    root.render(<LogInPage />);  // Монтируем компонент
  }

  const myProfileElement = document.getElementById('myProfile-page');
  if (myProfileElement) {
    const root = ReactDOM.createRoot(myProfileElement);  // Используем createRoot
    root.render(<MyProfile />);  // Монтируем компонент
  }
});
