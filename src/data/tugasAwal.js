import { tanggalDepan } from "../utils/tanggal.js";

export const MATA_KULIAH = [
  "Pemrograman Berorientasi Objek",
  "Basis Data",
  "Strategi Algoritma",
  "Sistem Operasi",
  "Probabilitas dan Statistika",
  "Pengembangan Aplikasi Web",
  "Pengembangan Aplikasi Mobile",
  "Interaksi Manusia Komputer",
];

// Data contoh. Tenggat dihitung dari hari ini supaya selalu terlihat hidup.
export function buatTugasAwal() {
  return [
    {
      id: "t1",
      judul: "Dasbor tugas kuliah dengan React",
      matkul: "Pengembangan Aplikasi Web",
      deadline: tanggalDepan(5),
      catatan: "Publikasikan ke website pribadi dan push ke GitHub (minimal 5 commit).",
      selesai: false,
    },
    {
      id: "t2",
      judul: "Laporan praktikum penjadwalan proses",
      matkul: "Sistem Operasi",
      deadline: tanggalDepan(2),
      catatan: "Lampirkan tangkapan layar hasil simulasi di terminal.",
      selesai: false,
    },
    {
      id: "t3",
      judul: "Latihan soal distribusi peluang",
      matkul: "Probabilitas dan Statistika",
      deadline: tanggalDepan(9),
      catatan: "",
      selesai: false,
    },
    {
      id: "t4",
      judul: "Revisi query laporan akhir",
      matkul: "Basis Data",
      deadline: tanggalDepan(-2),
      catatan: "Tambahkan JOIN untuk tabel pemesanan dan pelanggan.",
      selesai: false,
    },
    {
      id: "t5",
      judul: "Modul barang pada proyek kelompok",
      matkul: "Pemrograman Berorientasi Objek",
      deadline: tanggalDepan(-4),
      catatan: "Sudah digabung ke branch utama.",
      selesai: true,
    },
  ];
}
