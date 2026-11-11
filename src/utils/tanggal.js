// Fungsi bantu untuk tanggal dan status tenggat tugas.

function keISO(tanggal) {
  const y = tanggal.getFullYear();
  const m = String(tanggal.getMonth() + 1).padStart(2, "0");
  const d = String(tanggal.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Tanggal n hari dari hari ini, format YYYY-MM-DD.
export function tanggalDepan(n) {
  const tanggal = new Date();
  tanggal.setDate(tanggal.getDate() + n);
  return keISO(tanggal);
}

// Selisih hari antara tenggat dan hari ini (negatif = sudah lewat).
export function hitungSisaHari(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const tenggat = new Date(y, m - 1, d);
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);
  return Math.round((tenggat - hariIni) / 86400000);
}

export function formatTanggal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Menentukan status tampilan sebuah tugas.
// kode: selesai | terlambat | mendesak | aman
export function getStatus(tugas) {
  if (tugas.selesai) return { kode: "selesai", label: "Selesai" };

  const sisa = hitungSisaHari(tugas.deadline);
  if (sisa < 0) return { kode: "terlambat", label: `Terlambat ${-sisa} hari` };
  if (sisa === 0) return { kode: "mendesak", label: "Hari ini" };
  if (sisa === 1) return { kode: "mendesak", label: "Besok" };
  if (sisa <= 3) return { kode: "mendesak", label: `Sisa ${sisa} hari` };
  return { kode: "aman", label: `Sisa ${sisa} hari` };
}
