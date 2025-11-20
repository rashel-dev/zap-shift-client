import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../Firebase/firebase.init';



const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false);


    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email,password) => {
            setLoading(true);
            return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        registerUser,
        signInUser,
        loading,
        setLoading,
        
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;