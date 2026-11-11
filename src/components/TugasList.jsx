import TugasItem from "./TugasItem.jsx";

// Merender array tugas dengan map() dan key unik (id).
function TugasList({ daftar, pesanKosong, onToggle, onHapus }) {
  if (daftar.length === 0) {
    return <p className="kosong">{pesanKosong}</p>;
  }

  return (
    <ul className="daftar">
      {daftar.map((tugas) => (
        <TugasItem key={tugas.id} tugas={tugas} onToggle={onToggle} onHapus={onHapus} />
      ))}
    </ul>
  );
}

export default TugasList;
