import {auth} from "../firebase/firebase"
import React, { useContext, useEffect, useState } from "react"
import { onAuthStateChanged,type User } from "firebase/auth"

interface authContext{
    currentUser: User | null
    isLoggin: boolean
    loading: boolean
}

const createContext = React.createContext<authContext | null>(null)
export function useAuth() {
  return useContext(createContext);
}

export const authProvider = ({children} : {children : React.ReactNode}) =>{
    const [currentUser, setCurrentUser] = useState< User | null>(null)
    const [isLoggin, setIsLoggin] = useState(false)
    const [loading, setLoading] = useState(true)

    const initializeUser = (user: User | null) =>{
        if(user){
            setCurrentUser(user)
            setIsLoggin(true)
            setLoading(false)
        }else{
            setCurrentUser(null)
            setIsLoggin(false)
        }
    }

    useEffect( () => {
        const subscriber = onAuthStateChanged(auth, initializeUser)
        return subscriber
    },[]);

    const value: authContext ={
        currentUser,
        isLoggin,
        loading
    }

   return (<createContext.Provider value={value}>
    {!loading && children}
    </createContext.Provider>)
    
}