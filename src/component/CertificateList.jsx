import CertificateItem from "./CertificateItem";
import PropTypes from "prop-types";

function CertificateList({
  certificates,
  setEdit,
  deletePopup,
  certificateVisible,
  isLoadingVisibility,
  showForm,
  isLoading,
  keyword
}) {
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
        <p>Kamu belum menambahkan certificate</p>
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
        isLoadingVisibility={isLoadingVisibility}
        showForm={showForm}
        keyword={keyword}
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
      image: PropTypes.string.isRequired,
      url_credential: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ),
  setEdit: PropTypes.func,
  deletePopup: PropTypes.func,
  certificateVisible: PropTypes.func,
  isLoadingVisibility: PropTypes.bool,
  showForm: PropTypes.func,
  isLoading: PropTypes.bool,
  keyword: PropTypes.string,
}

export default CertificateList;