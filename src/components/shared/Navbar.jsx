import React, { useTransition } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuthCall from '../../hooks/useAuthCall';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/authSlice';

export default function Navbar() {
  const { signOut } = useAuthCall();
  const [isPending, startTransition] = useTransition();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="navbar bg-brandAccent border-b border-accent/30 px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="lg:hidden text-brandPrimary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-background p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <a className="text-xl font-bold text-brandPrimary tracking-wider">
          Blog App
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-brandDark font-medium">
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {currentUser ? (
              <>
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      startTransition(() => {
                        signOut();
                      });
                    }}
                    disabled={isPending}
                  >
                    {isPending ? 'Çıkış Yapılıyor...' : 'Logout'}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={'/sign-in'}>Login</Link>
                </li>
                <li>
                  <Link to={'/sign-up'}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
