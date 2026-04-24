import PropTypes from "prop-types";

function PopupMessage({ setPopup, data, onDelete }) {
  return (
    <div className="popup-message">
      <div className="box">
        <p>Apakah anda ingin menghapus ?</p>
        <p>Judul : {data.title}</p>
        <div className="btn">
          <button onClick={() => setPopup(false)}><i className="fa fa-chevron-left"></i> Kembali</button>
          <button onClick={onDelete}><i className="fa fa-trash"></i> Hapus</button>
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