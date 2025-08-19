import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div>
      <header className="header-container">
       <h1>DevConnect</h1>
      </header>

        <h2>Welcome to the DevConnect Community chat and message board!</h2>

    </div>
    
  );
}

export default Header;