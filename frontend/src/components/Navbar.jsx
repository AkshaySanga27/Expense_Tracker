function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Expense Tracker</h1>

        <div className="navbar-links">
          <a href="/">Dashboard</a>
          <a href="/">Expenses</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;