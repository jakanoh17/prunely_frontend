import headerLogo from "../assets/logo_no-words.png";

function Header() {
  return (
    <div className="header">
      <div className="header__left-side">
        <img src={headerLogo} alt="Prunely logo" className="header__logo" />
      </div>
      <div className="header__right-side">
        <button className="header__btn">About Us</button>
        <button className="header__btn">My Profile</button>
        <button className="header__btn">Login | Signup</button>
      </div>
    </div>
  );
}

export default Header;
