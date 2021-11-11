import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {auth} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() { //returns the current context
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  } 

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscriber
  }, [])

  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}