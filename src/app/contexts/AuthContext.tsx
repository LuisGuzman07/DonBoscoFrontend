import React, { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "@/components/AxiosInstance";

import { Usuario } from "../modelos/Usuarios";

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("/user/auth/perfil/")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children} 
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);