function Navbar({ currentPage, isAuthenticated, onNavigate, onLogout }) {
  const activePage = currentPage === 'articleDetails' ? 'resources' : currentPage

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
    { key: 'lawyers', label: 'Lawyers' },
    ...(isAuthenticated ? [{ key: 'dashboard', label: 'Dashboard' }] : []),
    ...(isAuthenticated ? [{ key: 'caseTracking', label: 'Case Tracking' }] : []),
    { key: 'resources', label: 'Resources' },
    { key: 'contact', label: 'Contact' },
    { key: isAuthenticated ? 'lawyers' : 'login', label: 'Login' },
    ...(isAuthenticated ? [] : [{ key: 'signup', label: 'Signup' }]),
  ]

  return (
    <nav className="navbar navbar-expand-lg app-navbar sticky-top">
      <div className="container">
        <button
          type="button"
          className="navbar-brand brand-mark border-0 bg-transparent p-0"
          onClick={() => onNavigate('home')}
        >
          Legal Link
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#appNavbar"
          aria-controls="appNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="appNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.label}>
                <button
                  type="button"
                  className={`nav-link nav-button ${activePage === item.key ? 'active' : ''}`}
                  onClick={() => onNavigate(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-dark rounded-pill px-4"
                onClick={onLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-dark rounded-pill px-4"
                  onClick={() => onNavigate('signup')}
                >
                  Signup
                </button>
                <button
                  type="button"
                  className="btn btn-dark rounded-pill px-4"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
