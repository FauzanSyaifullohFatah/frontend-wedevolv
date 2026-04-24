import { useEffect, useState } from "react";
import FormInputCertificate from "../../component/FormInputCertificate";
import MiniNavbar from "../../component/MiniNavbar";
import PopupMessage from "../../component/PopupMessage";
import { API, getCertificates } from "../../utils/api";
import CertificateList from "../../component/CertificateList";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [showFormCertificate, setShowFormCertificate] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isLoadingVisibility, setIsLoadingVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const cert = await getCertificates();
      setCertificates(cert);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleCertificateAdded = (certificate) => {
    if (editingCertificate) {
      setCertificates((prev) =>
        prev.map((c) => (c.id === certificate.id ? certificate : c))
      );
    } else {
      setCertificates((prev) => [certificate, ...prev]);
    }
  
    setShowFormCertificate(false);
    setEditingCertificate(null);
  };

  const handleDeleteCertificate = async (id) => {
    try {
      await API.delete(`/certificates/${id}/`);
  
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      setPopup(false);
  
    } catch (err) {
      console.error("Gagal hapus:", err.response?.data || err);
    }
  };

  const handlePopupDelete = (certificate) => {
    setSelectedCertificate(certificate);
    setPopup(true);
  };

  const handleCertificateVisible = async (id, currentValue) => {
    setIsLoadingVisibility(true);

    try {
      await API.patch(`/certificates/${id}/`, {
        is_visible: !currentValue,
      });

      setCertificates((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_visible: !currentValue }
            : item
        )
      );
    } catch (err) {
      console.error("Gagal update visibility:", err.response?.data || err);
    } finally {
      setIsLoadingVisibility(false);
    }
  };
  
  return (
    <div className="my-certificates">
      {!(showFormCertificate || popup) && (
        <>
          <MiniNavbar
            variant={"Certificates"}
            keyword={keyword}
            setKeyword={setKeyword}
            onAdd={() => {
              setEditingCertificate(null);
              setShowFormCertificate(true);
            }}
          />
          <CertificateList
            certificates={certificates}
            setEdit={setEditingCertificate}
            deletePopup={handlePopupDelete}
            certificateVisible={handleCertificateVisible}
            isLoadingVisibility={isLoadingVisibility}
            showForm={setShowFormCertificate}
            isLoading={isLoading}
            keyword={keyword}
          />
        </>
      )}
      {popup && (
        <PopupMessage
          setPopup={setPopup}
          data={selectedCertificate}
          onDelete={() => handleDeleteCertificate(selectedCertificate.id)}
        />
      )}
      {showFormCertificate && (
        <FormInputCertificate
          setShowFormCertificate={setShowFormCertificate}
          onCertificateAdded={handleCertificateAdded}
          certificateToEdit={editingCertificate}
        />
      )}
    </div>
  )
}

export default MyCertificates;