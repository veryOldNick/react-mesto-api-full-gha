import logo from '../images/Vector.svg';
import React from "react";
import { Routes, Route, Link } from 'react-router-dom';


function Header({email, onLogout}) {
  return (
    <header className="header">
    <img src={logo} alt="изображение логотипа" className="header__logo"/>

    <Routes>
        <Route path='/sign-in' element={
          <Link to='/sign-up' className='header__link'>Регистрация
          </Link>} />
        <Route path='/sign-up' element={
          <Link to='/sign-in' className='header__link'>Войти
          </Link>} />

        <Route path="/" element={<nav className="header__nav">
          <span className="header__email">{email}</span>
          <Link className="header__button" to="/sign-in" onClick={onLogout}>Выйти</Link></nav>} />
      </Routes>
  </header>
  )
};

export default Header;
