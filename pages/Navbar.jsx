import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import sidhu from '../public/Sidhu.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    // Note: You don't need to check for token !== '' because an empty string evaluates to false
  });

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false); // Update the login status
  };

  return (
    <div>
      <style jsx>
        {`
        .nav-link:hover {
          color: green;
          background-color: white;
          
          transition: all 0.3s ease;
        }
      `}

      </style>
      <nav className="navbar navbar-dark  fixed-top" style={{ background: 'black' }}>
        <div className="container-fluid">
          <Link href="/Home"><Image src={sidhu} width={49} height={33} alt="" /></Link>
          <Link href="/Home" className="navbar-brand" style={{ fontFamily: 'monsteerat' }}>
            <h4>Sidhu Coaching Center</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="offcanvas offcanvas-end " tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style={{ background: 'black' }}>
            <div className="offcanvas-header">
              <h4 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                <Link href="/Home" className="d-flex" style={{ color: 'white', textDecoration: 'none' }}>
                  <Image src={sidhu} className="mx-2" width={49} height={33} alt="" />
                  {' '}
                  Sidhu Coaching Center
                </Link>

              </h4>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body mx-auto">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item " style={{ fontSize: '20px' }}>
                  <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`} aria-current="page">
                    <i className="fa-solid fa-house" />
                    {' '}
                    Home
                  </Link>
                </li>
                <li className="nav-item my-3" style={{ fontSize: '20px' }}>
                  <Link href="/About" className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}>
                    <i className="fa-solid fa-address-card" />
                    {' '}
                    About
                  </Link>
                </li>
                <li className="nav-item my-3" style={{ fontSize: '20px' }}>
                  <Link href="/profile" className={`nav-link ${router.pathname === '/profile' ? 'active' : ''}`}>
                    <i className="fa-regular fa-user" />
                    {' '}
                    Profile
                  </Link>
                </li>
                <li className="nav-item my-3" style={{ fontSize: '20px' }}>
                  <Link href="/components/getquery" className={`nav-link ${router.pathname === '/components/getquery' ? 'active' : ''}`}>
                    <i className="fa-regular fa-user" />
                    {' '}
                    Your queries
                  </Link>
                </li>

                {isLoggedIn ? (
                  <li className="nav-item my-3" style={{ fontSize: '20px' }}>
                    <Link href="/login" className={`nav-link ${router.pathname === '/login' ? 'active' : ''}`} onClick={handleLogout} style={{ textDecoration: 'none' }}>
                      <i className={`fa-solid fa-arrow-right-from-bracket nav-link ${router.pathname === '/login' ? 'active' : ''}`} />
                      LogOut
                    </Link>
                  </li>
                ) : (
                  <span>
                    <li className="nav-item d-flex my-3" style={{ fontSize: '20px' }}>
                      <i className={`fa-solid fa-right-to-bracket my-2 nav-link ${router.pathname === '/signup' ? 'active' : ''}`} />
                      <Link href="/signup" className={`my-1 nav-link mx-1 ${router.pathname === '/signup' ? 'active' : ''}`} style={{ textDecoration: 'none', width: '20px' }}>
                        SignUp
                      </Link>
                    </li>
                    <li className="nav-item d-flex my-3" style={{ fontSize: '20px' }}>
                      <i className={`fa-solid fa-right-to-bracket my-2 nav-link ${router.pathname === '/signin' ? 'active' : ''}`} />
                      <Link href="/login" className={`mx-1 my-1 nav-link ${router.pathname === '/login' ? 'active' : ''}`} style={{ textDecoration: 'none', width: '20px' }}>
                        Login
                      </Link>
                    </li>
                  </span>
                )}
              </ul>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
}
