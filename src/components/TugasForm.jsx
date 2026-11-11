import { useState } from "react";
import Button from "./Button.jsx";
import { MATA_KULIAH } from "../data/tugasAwal.js";
import { tanggalDepan } from "../utils/tanggal.js";

// Formulir tambah tugas. Semua input dikontrol dengan useState.
function TugasForm({ onTambah }) {
  const [judul, setJudul] = useState("");
  const [matkul, setMatkul] = useState(MATA_KULIAH[0]);
  const [deadline, setDeadline] = useState(tanggalDepan(7));
  const [catatan, setCatatan] = useState("");
  const [galat, setGalat] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!judul.trim()) {
      setGalat("Judul tugas wajib diisi.");
      return;
    }
    if (!deadline) {
      setGalat("Tanggal tenggat wajib dipilih.");
      return;
    }

    onTambah({ judul: judul.trim(), matkul, deadline, catatan: catatan.trim() });
    setJudul("");
    setCatatan("");
    setDeadline(tanggalDepan(7));
    setGalat("");
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__baris">
        <label htmlFor="judul">Judul tugas</label>
        <input
          id="judul"
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Contoh: Laporan praktikum"
          aria-invalid={galat && !judul.trim() ? "true" : undefined}
          aria-describedby={galat ? "galat-form" : undefined}
        />
      </div>

      <div className="form__baris">
        <label htmlFor="matkul">Mata kuliah</label>
        <select id="matkul" value={matkul} onChange={(e) => setMatkul(e.target.value)}>
          {MATA_KULIAH.map((nama) => (
            <option key={nama} value={nama}>
              {nama}
            </option>
          ))}
        </select>
      </div>

      <div className="form__baris">
        <label htmlFor="deadline">Tenggat</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="form__baris">
        <label htmlFor="catatan">Catatan (opsional)</label>
        <textarea
          id="catatan"
          rows="3"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Hal yang perlu diingat"
        />
      </div>

      {galat && (
        <p id="galat-form" className="form__galat" role="alert">
          {galat}
        </p>
      )}

      <Button type="submit" variant="primer">
        Simpan tugas
      </Button>
    </form>
  );
}

export default TugasForm;
