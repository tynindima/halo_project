import React from 'react';
import './styles/header.scss';

const Header = () => (
  <header className="header">
    <h1 className="header__title">Your first project</h1>
    <div className="header__group number-group">
      <span className="number-group__item">1</span>
      <span className="number-group__item">2</span>
      <span className="number-group__item active">3</span>
    </div>
  </header>
);

export default Header;
