import { useState, useEffect } from "react"
import { LanguageContext } from "./LanguageContext";
import { translations } from "../../utils/translations";
import PropTypes from "prop-types";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const changeLang = (value) => {
    setLang(value);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  };

  const t = (key) => {
    return key
      .split(".")
      .reduce((obj, i) => obj?.[i], translations[lang]) || key;
  };

  return (
    <LanguageContext.Provider
      value={{ lang, changeLang, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}