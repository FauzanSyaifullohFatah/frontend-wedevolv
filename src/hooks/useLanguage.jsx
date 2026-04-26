import { useContext } from "react";
import { LanguageContext } from "../context/language/LanguageContext";

export function useLanguage() {
  return useContext(LanguageContext);
}