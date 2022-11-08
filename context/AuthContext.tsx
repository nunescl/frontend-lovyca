import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { ScriptProps } from 'next/script';
import { parseCookies } from 'nookies';

export const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: ScriptProps) {
  const [currentUser, setCurrentUser] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  function logout() {
    return signOut(auth);
  }

  function CheckLogin(ctx?: any) {
    const { 'nextauth.token': token } = parseCookies(ctx);
    if (token) {
      setCurrentUser(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    CheckLogin();
  });

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
