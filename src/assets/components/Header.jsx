// src/assets/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const linkClass = (path) =>
    `px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white transition-colors ${
      location.pathname === path
        ? 'bg-blue-700 text-white'
        : 'text-white hover:bg-blue-600 hover:text-white'
    }`;

  return (
    <header className="bg-blue-600 shadow-md my-5">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-3 my-3">
        <h1 className="text-2xl font-bold text-white mb-3 sm:mb-0">🍽️ Recipe Finder</h1>
        <nav className="flex flex-wrap gap-4 mb-10">
          <Link to="/" className={linkClass('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          <Link to="/favorites" className={linkClass('/favorites')} aria-current={location.pathname === '/favorites' ? 'page' : undefined}>
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}
