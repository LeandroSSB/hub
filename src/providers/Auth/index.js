import { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext([])
export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
    if (token) {
      setAuth(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuth(false);
    history.push("/login");

  };
  const login = (id, token ) => {
    console.log("hey")
    localStorage.setItem("@KenzieHub:id", JSON.stringify(id));
    localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
    history.push("/dashboard");
    setAuth(true);
  }

  return (
    <AuthContext.Provider value = {{auth,login,logout}} >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)