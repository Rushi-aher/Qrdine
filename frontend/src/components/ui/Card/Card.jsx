import "./Card.css";

const Card = ({ children }) => {
  return (
    <div className="qr-card">
      {children}
    </div>
  );
};

export default Card;