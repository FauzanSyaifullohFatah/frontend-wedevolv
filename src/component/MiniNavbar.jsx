import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

function MiniNavbar({ variant, onAdd, keyword, setKeyword }) {
  const { t } = useLanguage();
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (variant === "Projects") {
      setIcon("fa fa-file-code");
    } else {
      setIcon("fa-solid fa-award");
    }
  }, [variant])

  return (
    <div className="mini-navbar">
      <h3><i className={icon}></i> {variant}</h3>
      <div className="search-box">
        <label htmlFor={variant}><i className="fa fa-search"></i></label>
        <input
          type="search"
          id={variant}
          placeholder={t("search")}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button
        type="button"
        id="button-add"
        onClick={onAdd}
      >
        <i className="fa fa-plus-circle"></i>
        <p>{t("add")}</p>
      </button>
    </div>
  )
}

MiniNavbar.propTypes = {
  variant: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
}

export default MiniNavbar;