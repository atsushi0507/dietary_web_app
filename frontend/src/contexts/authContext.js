"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig"; // 適切なパスでインポート

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
