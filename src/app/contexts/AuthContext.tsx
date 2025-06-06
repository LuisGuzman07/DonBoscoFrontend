import React, { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "@/components/AxiosInstance";

import { Usuario } from "../modelos/Usuarios";

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {}
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setUser(null);
    setLoading(false);
    return;
  }

  AxiosInstance.get("/user/auth/usuarios/perfil/")
    .then(res => setUser(res.data))
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
}, []);


  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children} 
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);