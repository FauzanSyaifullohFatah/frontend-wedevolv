import { useAuth } from "../../hooks/useAuth";

function Settings() {
  const { authedUser } = useAuth();

  return (
    <div className="settings">
      <button type="button">
        <i className="fa fa-lock"></i>
        <p>Ubah kata sandi</p>
      </button>
      <div className="wrapper">
        <form action="">
          <input
            type="password"
            placeholder="Kata sandi lama"
          />

          <input
            type="password"
            placeholder="Kata sandi baru"
          />
          <input
            type="password"
            placeholder="Konfirmasi kata sandi"
          />
          <button>
            Ubah kata sandi
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings;