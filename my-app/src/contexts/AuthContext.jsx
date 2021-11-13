import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {auth} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() { //returns the current context
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true) //by default is loading

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  } 

  //after runs useeffect, then the authentication of existing user is done
  useEffect(() => { //firebase sets tokens automatically (deal with initial loading state)
    const unsubscriber = auth.onAuthStateChanged(user => {
      setCurrentUser(user) //set user before set loading 
      setLoading(false)
    })

    return unsubscriber
  }, [])

  const value = {
    currentUser,
    signup
  }

  //don't render anything in application until the user is set!!
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}