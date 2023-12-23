import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state with the value from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userInfo) => {
    setUser(userInfo);
    // Save user information to localStorage
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logoutUser = () => {
    setUser(null);
    // Remove user information from localStorage
    localStorage.removeItem('user');
  };

  // Optional: If you want to clear localStorage on component unmount
  useEffect(
    () => () => {
      localStorage.removeItem('user');
    },
    []
  );

  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
