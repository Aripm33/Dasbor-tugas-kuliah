import Button from "./Button.jsx";

const PILIHAN_FILTER = [
  { kode: "semua", label: "Semua" },
  { kode: "aktif", label: "Belum selesai" },
  { kode: "selesai", label: "Selesai" },
];

// Kolom pencarian dan tombol filter status.
function FilterBar({ kataKunci, onKataKunci, filter, onFilter, jumlah }) {
  return (
    <div className="filter">
      <div className="filter__cari">
        <label htmlFor="cari" className="sr-only">
          Cari tugas
        </label>
        <input
          id="cari"
          type="search"
          value={kataKunci}
          onChange={(e) => onKataKunci(e.target.value)}
          placeholder="Cari judul atau mata kuliah"
        />
      </div>

      <div className="filter__tombol" role="group" aria-label="Filter status tugas">
        {PILIHAN_FILTER.map((item) => (
          <Button
            key={item.kode}
            variant="filter"
            dipilih={filter === item.kode}
            onClick={() => onFilter(item.kode)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <p className="filter__jumlah" aria-live="polite">
        {jumlah} tugas ditampilkan
      </p>
    </div>
  );
}

export default FilterBar;
