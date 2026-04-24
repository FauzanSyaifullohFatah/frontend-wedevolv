import PropTypes from "prop-types";
import { useEffect, useState } from "react"; 
import { getUserLogged, getAccessToken } from "../../utils/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [authedUser, setAuthedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();
      
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const user = await getUserLogged();
        setAuthedUser(user);
      } catch {
        setAuthedUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authedUser, setAuthedUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}