import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const config =
  {
    headers: {
      authorization: `Bearer ${auth.accessToken}`
    }
  }


  return (
    <AuthContext.Provider value={{ auth, setAuth, config }}>
      {children}
    </AuthContext.Provider>
  )

}
export default AuthContext