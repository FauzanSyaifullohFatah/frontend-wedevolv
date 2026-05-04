import { useMatch, useNavigate } from "react-router-dom";

import UserPreference from "./UserPreference";
import NavigationPortfolio from "./NavigationPortfolio";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header(){
  const match = useMatch("/:username");
  const username = match?.params?.username;

  const reservedRoutes = [
    "login",
    "register",
    "dashboard",
    "aboutus",
    "reset-password",
    "confirm-password"
  ];
  const isPortfolioPage = match && !reservedRoutes.includes(username);

  const navigate = useNavigate();
  
  return (
    <header>
      <nav>
        <div className="logo" onClick={() => navigate("")}>
          <Logo />
          <p>Wedevolv</p>
        </div>
        <input type="checkbox" id="navbar" />
        <ul>
          {isPortfolioPage
            ? <NavigationPortfolio />
            : <Navigation />
          }
          <li><UserPreference /></li>
        </ul>
        <label htmlFor="navbar" id="button-navbar"><i className="fa-solid fa-bars"></i></label>
      </nav>
    </header>
  )
}

export default Header;