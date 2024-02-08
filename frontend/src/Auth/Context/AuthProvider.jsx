import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(); // Initial value for login state
  const [userData, setUserData] = useState()
  useEffect(() => {
    axios.get('http://localhost:8099/api/protected')
      .then(res => {
        // console.log(res.data.user.userDetails)
          setLogin(res.data.login)
        if (res.data.login) {
          setUserData(res.data.user.userDetails)
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <AuthContext.Provider value={{ login, setLogin, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
