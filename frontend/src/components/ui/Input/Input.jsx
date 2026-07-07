import "./Input.css";

const Input = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    error,
    required = false,
}) => {

    return (

        <div className="qr-input-group">

            {label && (
                <label className="qr-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <input
                className={`qr-input ${error ? "qr-input-error" : ""}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />

            {error && (
                <p className="qr-error">
                    {error}
                </p>
            )}

        </div>

    );

};

export default Input;