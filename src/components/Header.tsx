import { useHistory } from "react-router";
import Logo from "./Logo";

const Header = () => {
  const history = useHistory();

  return (
    <header className="header">
      <Logo />
      <label
        className="header__label"
        onClick={() => history.push("/watchList")}
      >
        Watch List
      </label>
      <label className="header__label" onClick={() => history.push("/watched")}>
        Watched
      </label>
    </header>
  );
};

export default Header;
