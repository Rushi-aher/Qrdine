import "./Button.css";

const Button = ({
    children,
    variant = "primary",
    size = "medium",
    type = "button",
    disabled = false,
    fullWidth = false,
    onClick,
}) => {

    return (

        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                qr-btn
                qr-btn-${variant}
                qr-btn-${size}
                ${fullWidth ? "qr-btn-full" : ""}
            `}
        >

            {children}

        </button>

    );

};

export default Button;