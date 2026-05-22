import { useLanguage } from "../hooks/useLanguage";
import CertificateItem from "./CertificateItem";
import PropTypes from "prop-types";

function CertificateList({
  certificates,
  setEdit,
  deletePopup,
  certificateVisible,
  loadingId,
  showForm,
  isLoading,
  keyword,
  onlyVisible,
  onClick
}) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="is-loading">
        <span></span>
      </div>
    )
  }

  if (certificates.length === 0) {
    return (
      <div className="empty-state">
        <span>
          <i className="fa fa-folder-plus"></i>
        </span>
        <p>{t("emptyCertificate")}</p>
      </div>
    )
  }
  
  return (
    <div className="certificate-list">
      <CertificateItem
        certificates={certificates}
        setEdit={setEdit}
        deletePopup={deletePopup}
        certificateVisible={certificateVisible}
        loadingId={loadingId}
        showForm={showForm}
        keyword={keyword}
        onlyVisible={onlyVisible}
        onClick={onClick}
      />
    </div>
  )
}

CertificateList.propTypes = {
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      id_credential: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      issued_by: PropTypes.string.isRequired,
      issue_date: PropTypes.string.isRequired,
      expiration_date: PropTypes.string.isRequired,
      skills: PropTypes.string.isRequired,
      image: PropTypes.string,
      url_credential: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ),
  setEdit: PropTypes.func,
  deletePopup: PropTypes.func,
  certificateVisible: PropTypes.func,
  loadingId: PropTypes.number,
  showForm: PropTypes.func,
  isLoading: PropTypes.bool,
  keyword: PropTypes.string,
  onlyVisible: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CertificateList;