import "./Select.css";

const Select = ({
  label,
  value,
  onChange,
  options = [],
}) => {
  return (
    <div className="qr-select-group">

      {label && <label>{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className="qr-select"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Select;