// Tombol yang dipakai ulang di seluruh aplikasi.
// variant: primer | ghost | bahaya | filter
function Button({ variant = "ghost", type = "button", dipilih, children, ...sisa }) {
  return (
    <button
      type={type}
      className={`tombol tombol--${variant}`}
      aria-pressed={dipilih}
      {...sisa}
    >
      {children}
    </button>
  );
}

export default Button;
