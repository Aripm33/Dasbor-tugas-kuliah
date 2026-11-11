import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import StatCard from "./components/StatCard.jsx";
import TugasForm from "./components/TugasForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TugasList from "./components/TugasList.jsx";
import Footer from "./components/Footer.jsx";
import { buatTugasAwal } from "./data/tugasAwal.js";
import { getStatus } from "./utils/tanggal.js";

const PROFIL = { nama: "Arip Munandar", nim: "1247050094" };
const KUNCI_PENYIMPANAN = "dasbor-tugas-arip";

const TAUTAN = [
  { href: "#ringkasan", label: "Ringkasan" },
  { href: "#tambah", label: "Tambah tugas" },
  { href: "#daftar", label: "Daftar tugas" },
  { href: "#tentang", label: "Tentang" },
];

const KONSEP = [
  { nama: "Komponen", isi: "Tampilan dipecah menjadi 10 komponen di folder src/components." },
  { nama: "Props", isi: "Data dan fungsi dikirim dari App ke komponen anak, misalnya TugasItem." },
  { nama: "State", isi: "useState menyimpan daftar tugas, kata kunci pencarian, dan filter." },
  { nama: "Event handling", isi: "Klik tombol, ketik di kolom cari, dan kirim formulir." },
  { nama: "Conditional rendering", isi: "Detail tugas, konfirmasi hapus, dan pesan kosong tampil sesuai kondisi." },
  { nama: "List rendering", isi: "Daftar tugas dirender dengan map() dan key berupa id unik." },
];

// Data awal: ambil dari penyimpanan browser, kalau belum ada pakai data contoh.
function muatTugas() {
  try {
    const tersimpan = localStorage.getItem(KUNCI_PENYIMPANAN);
    if (tersimpan) return JSON.parse(tersimpan);
  } catch {
    // penyimpanan tidak tersedia, lanjut dengan data contoh
  }
  return buatTugasAwal();
}

function buatId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function App() {
  const [tugas, setTugas] = useState(muatTugas);
  const [kataKunci, setKataKunci] = useState("");
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(tugas));
    } catch {
      // abaikan jika penyimpanan penuh atau diblokir
    }
  }, [tugas]);

  function tambahTugas(data) {
    setTugas((lama) => [{ id: buatId(), selesai: false, ...data }, ...lama]);
  }

  function hapusTugas(id) {
    setTugas((lama) => lama.filter((t) => t.id !== id));
  }

  function toggleSelesai(id) {
    setTugas((lama) => lama.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));
  }

  // Cari + filter, lalu urutkan: belum selesai dulu, tenggat terdekat di atas.
  const kata = kataKunci.trim().toLowerCase();
  const tugasTampil = tugas
    .filter((t) => {
      const cocokKata =
        t.judul.toLowerCase().includes(kata) || t.matkul.toLowerCase().includes(kata);
      const cocokFilter =
        filter === "semua" || (filter === "selesai" ? t.selesai : !t.selesai);
      return cocokKata && cocokFilter;
    })
    .sort((a, b) => {
      if (a.selesai !== b.selesai) return a.selesai ? 1 : -1;
      return a.deadline.localeCompare(b.deadline);
    });

  const total = tugas.length;
  const jumlahSelesai = tugas.filter((t) => t.selesai).length;
  const jumlahMendesak = tugas.filter((t) => {
    const kode = getStatus(t).kode;
    return kode === "mendesak" || kode === "terlambat";
  }).length;
  const persen = total === 0 ? 0 : Math.round((jumlahSelesai / total) * 100);

  const pesanKosong =
    total === 0
      ? "Belum ada tugas. Isi formulir di samping untuk menambahkan yang pertama."
      : "Tidak ada tugas yang cocok dengan pencarian atau filter ini.";

  return (
    <>
      <Navbar merek="Dasbor Tugas" tautan={TAUTAN} />

      <main>
        <div id="ringkasan">
          <Hero
            nama={PROFIL.nama}
            nim={PROFIL.nim}
            persen={persen}
            jumlahMendesak={jumlahMendesak}
            total={total}
          />

          <section className="stats" aria-label="Ringkasan tugas">
            <StatCard label="Total tugas" nilai={total} />
            <StatCard
              label="Sudah selesai"
              nilai={jumlahSelesai}
              nada="baik"
              keterangan={`dari ${total} tugas`}
            />
            <StatCard
              label="Perlu segera"
              nilai={jumlahMendesak}
              nada={jumlahMendesak > 0 ? "waspada" : "netral"}
              keterangan="tenggat 3 hari atau terlambat"
            />
          </section>
        </div>

        <div className="tata-letak">
          <section id="tambah" className="panel panel--form" aria-labelledby="judul-tambah">
            <h2 id="judul-tambah">Tambah tugas</h2>
            <TugasForm onTambah={tambahTugas} />
          </section>

          <section id="daftar" className="panel" aria-labelledby="judul-daftar">
            <h2 id="judul-daftar">Daftar tugas</h2>
            <FilterBar
              kataKunci={kataKunci}
              onKataKunci={setKataKunci}
              filter={filter}
              onFilter={setFilter}
              jumlah={tugasTampil.length}
            />
            <TugasList
              daftar={tugasTampil}
              pesanKosong={pesanKosong}
              onToggle={toggleSelesai}
              onHapus={hapusTugas}
            />
          </section>
        </div>

        <section id="tentang" className="tentang" aria-labelledby="judul-tentang">
          <h2 id="judul-tentang">Tentang aplikasi</h2>
          <p>
            Dasbor ini dibuat dengan React dan Vite untuk Tugas Pertemuan 7. Data tugas
            disimpan di browser, jadi tidak hilang saat halaman dimuat ulang.
          </p>
          <ul className="konsep">
            {KONSEP.map((item) => (
              <li key={item.nama}>
                <strong>{item.nama}</strong>
                <span>{item.isi}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer nama={PROFIL.nama} nim={PROFIL.nim} />
    </>
  );
}

export default App;
