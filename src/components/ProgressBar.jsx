function ProgressBar({ persen, label }) {
  return (
    <div className="progres">
      <div
        className="progres__jalur"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={persen}
      >
        <div className="progres__isi" style={{ width: `${persen}%` }} />
      </div>
      <span className="progres__angka">{persen}%</span>
    </div>
  );
}

export default ProgressBar;
