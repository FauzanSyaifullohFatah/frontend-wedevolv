import PropTypes from "prop-types";
import { useLanguage } from "../hooks/useLanguage";

function PopupMessage({ setPopup, data, onDelete }) {
  const { t } = useLanguage();

  return (
    <div className="popup-message">
      <div className="box">
        <p>{t("deleteMessage.question")}</p>
        <p>{t("deleteMessage.title")} : {data.title}</p>
        <div className="btn">
          <button onClick={() => setPopup(false)}><i className="fa fa-chevron-left"></i> {t("deleteMessage.back")}</button>
          <button onClick={onDelete}><i className="fa fa-trash"></i> {t("deleteMessage.delete")}</button>
        </div>
      </div>
    </div>
  )
}

PopupMessage.propTypes = {
  setPopup: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
}

export default PopupMessage;