function Footer({ nama, nim }) {
  return (
    <footer className="footer">
      <p>
        {nama}, NIM {nim}
      </p>
      <p>Tugas Pertemuan 7, Pengembangan Aplikasi Web</p>
    </footer>
  );
}

export default Footer;
