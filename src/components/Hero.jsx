import ProgressBar from "./ProgressBar.jsx";

// Bagian pembuka: menampilkan nama, NIM, dan progres tugas.
function Hero({ nama, nim, persen, jumlahMendesak, total }) {
  let pesan;
  if (total === 0) {
    pesan = "Belum ada tugas. Tambahkan yang pertama lewat formulir di bawah.";
  } else if (persen === 100) {
    pesan = "Semua tugas sudah selesai. Waktunya istirahat.";
  } else if (jumlahMendesak > 0) {
    pesan = `${jumlahMendesak} tugas perlu dikerjakan dalam 3 hari ke depan.`;
  } else {
    pesan = "Belum ada tugas yang mendesak. Jadwalmu masih longgar.";
  }

  return (
    <section className="hero" aria-labelledby="judul-hero">
      <div className="hero__isi">
        <h1 id="judul-hero">Halo, {nama}</h1>
        <p className="hero__nim">NIM {nim}</p>
        <p className="hero__pesan">{pesan}</p>
        <ProgressBar persen={persen} label="Progres tugas selesai" />
      </div>
    </section>
  );
}

export default Hero;
