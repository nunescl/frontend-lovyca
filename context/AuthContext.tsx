import React, { useContext, useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { setCookie } from 'nookies';

export const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = useRef();

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setCurrentUser(user);
      setCookie(undefined, 'nextauth.token', user.accessToken, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userInfo, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
