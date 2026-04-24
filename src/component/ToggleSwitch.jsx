import PropTypes from "prop-types";
import "../style/mybutton.css";

function ToggleSwitch({ condition, handleOnclick }){
  return (
    <button
      className="toggle-switch"
      onClick={handleOnclick}
      style={condition
        ? {background: "#0ef"}
        : {background: "white"}
      }
    >
      <div
        id="toggle-control"
        style={condition
          ? {left: "58%"}
          : {left: "3%"}
        }
      >
      </div>
    </button>
  )
}

ToggleSwitch.propTypes = {
  condition: PropTypes.bool.isRequired,
  handleOnclick: PropTypes.func.isRequired,
}

export default ToggleSwitch;