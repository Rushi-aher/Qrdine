import "./LoadingScreen.css";

import logo1 from "../../assets/images/Qrdine-svg.svg";
import logo2 from "../../assets/images/By-svg.svg";
import logo3 from "../../assets/images/rushi-Svg.svg";

const LoadingScreen = () => {
    return (
        <div className="loading-screen">

            <div className="loading-logos">

                <div className="logo-circle">

                    <img
                        src={logo1}
                        className="loading-logo logo-top"
                        alt=""
                    />

                </div>


                <div className="loading-bottom-logos">

                    <img
                        src={logo2}
                        className="loading-logo"
                        alt=""
                    />

                    <img
                        src={logo3}
                        className="loading-logo"
                        alt=""
                    />

                </div>

            </div>

        </div>
    );
};

export default LoadingScreen;