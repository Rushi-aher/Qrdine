import "./QuickActionCard.css";

const QuickActionCard = ({ icon, title, description, onClick }) => {

    return (

        <div
            className="quick-action-card"
            onClick={onClick}
        >

            <div className="quick-action-icon">

                {icon}

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {description}

            </p>

        </div>

    );

};

export default QuickActionCard;