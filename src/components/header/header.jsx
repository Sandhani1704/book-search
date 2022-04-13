import React from "react";
import "./header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__nav-logo">
        BooksExplorer
      </Link>
    </header>
  );
}

export default Header;
