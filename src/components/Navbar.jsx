// Navigasi atas. Daftar tautan dikirim lewat props dan dirender dengan map().
function Navbar({ merek, tautan }) {
  return (
    <header className="navbar">
      <div className="navbar__isi">
        <a className="navbar__merek" href="#ringkasan">
          {merek}
        </a>
        <nav aria-label="Navigasi utama">
          <ul className="navbar__daftar">
            {tautan.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
