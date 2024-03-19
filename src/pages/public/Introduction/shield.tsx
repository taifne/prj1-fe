import "./shield.css";
import logo from "../../../../public/assets/images/hsoc-login/logo-hsoc.png";

export const Shield = () => {
    return (
        <div className="pyramid-loader">
            <div className="wrapper">
                <img src={logo} />
                <span className="shadow"></span>
            </div>
        </div>
    );
};
