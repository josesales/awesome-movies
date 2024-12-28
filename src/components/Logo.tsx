import { useHistory } from "react-router-dom";
import logo from "../assets/logo.svg";

const Logo = () => {
  const history = useHistory();

  return (
    <div
      className="logo"
      title="Home"
      onClick={() => {
        history.push("/");
      }}
    >
      <img src={logo} alt="Awesome Movies Logo" className="logo__img" />
      <h1 className="logo__name">Awesome Movies</h1>
    </div>
  );
};
export default Logo;
