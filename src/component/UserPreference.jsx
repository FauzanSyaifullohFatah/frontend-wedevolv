import { useTheme } from "../hooks/useTheme";

function UserPreference(){
  const { darkMode, toggleTheme } = useTheme();
  return (
    <div className="user-preference">
      <button>
        <span><i className="fa fa-language"></i></span>
        <p>Indonesia</p>
      </button>
      <button onClick={toggleTheme}>
        <span>
          <i className="fa fa-moon" style={darkMode ? {left: "0%"} : {left: "-100%"}}></i>
          <i className="fa fa-sun" style={darkMode ? {left: "100%"} : {left: "0%"}}></i>
        </span>
        <p>{darkMode ? "Gelap" : "Terang"}</p>
      </button>
    </div>
  )
}

export default UserPreference;