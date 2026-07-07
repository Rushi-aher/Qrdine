import "./Checkbox.css";

const Checkbox = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="qr-checkbox">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span>{label}</span>

    </label>
  );
};

export default Checkbox;