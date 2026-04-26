import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

function UserPreference(){
  const { darkMode, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <div className="user-preference">
      <button onClick={toggleLanguage}>
        <span><i className="fa fa-language"></i></span>
        <p>{lang === "id" ? "Indonesia" : "English"}</p>
      </button>
      <button onClick={toggleTheme}>
        <span>
          <i className="fa fa-moon" style={darkMode ? {left: "0%"} : {left: "-100%"}}></i>
          <i className="fa fa-sun" style={darkMode ? {left: "100%"} : {left: "0%"}}></i>
        </span>
        <p>{darkMode ? t("dark") : t("light")}</p>
      </button>
    </div>
  )
}

export default UserPreference;