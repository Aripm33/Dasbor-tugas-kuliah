import { useState } from "react";
import Button from "./Button.jsx";
import { formatTanggal, getStatus } from "../utils/tanggal.js";

// Satu baris tugas. Data masuk lewat props, aksi dikirim balik lewat callback.
function TugasItem({ tugas, onToggle, onHapus }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);

  const status = getStatus(tugas);
  const idDetail = `detail-${tugas.id}`;

  return (
    <li className={`tugas tugas--${status.kode}`}>
      <input
        className="tugas__centang"
        type="checkbox"
        checked={tugas.selesai}
        onChange={() => onToggle(tugas.id)}
        aria-label={`Tandai selesai: ${tugas.judul}`}
      />

      <div className="tugas__isi">
        <div className="tugas__atas">
          <div>
            <h3 className="tugas__judul">{tugas.judul}</h3>
            <p className="tugas__matkul">{tugas.matkul}</p>
          </div>
          <span className={`chip chip--${status.kode}`}>{status.label}</span>
        </div>

        {detailTerbuka && (
          <dl id={idDetail} className="tugas__detail">
            <dt>Tenggat</dt>
            <dd>{formatTanggal(tugas.deadline)}</dd>
            <dt>Catatan</dt>
            <dd>{tugas.catatan || "Tidak ada catatan."}</dd>
          </dl>
        )}

        <div className="tugas__aksi">
          <Button
            onClick={() => setDetailTerbuka(!detailTerbuka)}
            aria-expanded={detailTerbuka}
            aria-controls={idDetail}
          >
            {detailTerbuka ? "Sembunyikan detail" : "Lihat detail"}
          </Button>

          {konfirmasiHapus ? (
            <span className="tugas__konfirmasi">
              <span>Hapus tugas ini?</span>
              <Button variant="bahaya" onClick={() => onHapus(tugas.id)}>
                Ya, hapus
              </Button>
              <Button onClick={() => setKonfirmasiHapus(false)}>Batal</Button>
            </span>
          ) : (
            <Button onClick={() => setKonfirmasiHapus(true)}>Hapus</Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default TugasItem;
