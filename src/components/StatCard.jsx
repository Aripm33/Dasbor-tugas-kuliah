// Kartu angka ringkasan. nada: netral | baik | waspada
function StatCard({ label, nilai, nada = "netral", keterangan }) {
  return (
    <div className={`stat stat--${nada}`}>
      <p className="stat__nilai">{nilai}</p>
      <p className="stat__label">{label}</p>
      {keterangan && <p className="stat__ket">{keterangan}</p>}
    </div>
  );
}

export default StatCard;
