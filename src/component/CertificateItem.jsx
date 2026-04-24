import Image from "../component/Image";
import PropTypes from "prop-types";
import highlightText from "../utils/highlight";
import { useLocation } from "react-router-dom";

function CertificateItem({
  certificates,
  setEdit,
  deletePopup,
  certificateVisible,
  isLoadingVisibility,
  showForm,
  keyword = "",
}) {
  const locationPath = useLocation().pathname;

  const filteredCertificates = certificates.filter((c) =>
    [c.title, c.issued_by, c.id_credential]
      .join(" ")
      .toLowerCase()
      .includes(keyword.toLowerCase())
  )
  return (
    <>
      {filteredCertificates.length === 0
        ? (
          <div style={{color: "black"}}>
            <p>Tidak ada yang cocok dengan pencarian <b><q>{keyword}</q></b></p>
          </div>
        )
        : (
          filteredCertificates.map((c) => (
            <article className="certificate-item" key={c.id}>
              <div className="side">
                <Image src={c.image} alt={c.title} />
              </div>
              <div className="side">
                <h3>{highlightText(c.title, keyword)}</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>ID CREDENTIAL</td>
                      <td>:</td>
                      <td id="id-credential">{highlightText(c.id_credential, keyword)}</td>
                    </tr>
                    <tr>
                      <td>ISSUED BY</td>
                      <td>:</td>
                      <td id="issued-by">{highlightText(c.issued_by, keyword)}</td>
                    </tr>
                    <tr>
                      <td>ISSUE DATE</td>
                      <td>:</td>
                      <td id="issued-date">{c.issue_date}</td>
                    </tr>
                    <tr>
                      <td>EXPIRATION DATE</td>
                      <td>:</td>
                      <td id="expiration-date">{c.expiration_date}</td>
                    </tr>
                    <tr>
                      <td>URL CREDENTIAL</td>
                      <td>:</td>
                      <td id="url-credential"><a href={c.url_credential} target="_blank" rel="noreferrer"></a>{c.url_credential}</td>
                    </tr>
                  </tbody>
                </table>
                <span>
                </span>
              </div>
              {locationPath === "/dashboard/projects" && (
                <div className="side">
                  <button
                    id="btn-show-certificate-portfolio"
                    onClick={() => certificateVisible(c.id, c.is_visible)}
                    className={c.is_visible ? "btn-active" : ""}
                  >
                    {isLoadingVisibility
                      ? <i className="fa fa-spinner" id="isLoadingVisible"></i>
                      : <i className="fa fa-globe"></i>
                    }
                  </button>
                  <button
                    onClick={() => {
                      setEdit(c)
                      showForm(true)
                    }}
                  >
                    <i className="fa fa-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => deletePopup(c)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              )}
            </article>
          ))
        )
      }
    </>
  )
}

CertificateItem.propTypes = {
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
  keyword: PropTypes.string,
}

export default CertificateItem;