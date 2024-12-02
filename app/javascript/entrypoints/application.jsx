import React from 'react';
import ReactDOM from 'react-dom/client';
import './application.css';
import HomePage from '../../frontend/components/HomePage'; // Путь к компоненту
import Registration from '../../frontend/components/Registration'; // Путь к компоненту
import LogInPage from '../../frontend/components/LogInPage'; // Путь к компоненту
import MyProfile from '../../frontend/components/MyProfile.jsx'; // Путь к компоненту
import NavBar from '../../frontend/components/NavBar.jsx';
import ShowPage from '../../frontend/components/ShowPage.jsx';
import Collaborations from '../../frontend/components/Collaborationpage.jsx';
import Footer from '../../frontend/components/Footer.jsx';




document.addEventListener('DOMContentLoaded', () => {
  const NavElement = document.getElementById('nav'); // id элемента, куда будет вставляться компонент
  if (NavElement) {
    const root = ReactDOM.createRoot(NavElement);  // Используем createRoot вместо render
    root.render(<NavBar />);  // Монтируем компонент
  }


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

  const showElement = document.getElementById('show-page');
  if (showElement) {
    const root = ReactDOM.createRoot(showElement);  // Используем createRoot
    root.render(<ShowPage />);  // Монтируем компонент
  }
  const collabElement = document.getElementById('collaborations');
  if (collabElement) {
    const root = ReactDOM.createRoot(collabElement);  // Используем createRoot
    root.render(<Collaborations />);  // Монтируем компонент
  }
  const FooterElement = document.getElementById('Footer');
  if (FooterElement) {
    const root = ReactDOM.createRoot(FooterElement);  // Используем createRoot
    root.render(<Footer />);  // Монтируем компонент
  }

  
});
