'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { default as Link, default as NavLink } from 'next/link';
import { SpinnerLoading } from '../utils/SpinnerLoading';

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Luv 2 Read</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" href="/home" prefetch={true}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="/search">
                Search Books
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" href="/shelf">
                  Shelf
                </NavLink>
              </li>
            )}
            {/* {user && user. authState.accessToken?.claims?.userType === 'admin' && */}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" href="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-light"
                  href="/api/auth/login"
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  type="button"
                  className="btn btn-outline-light"
                  href="/api/auth/logout"
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
