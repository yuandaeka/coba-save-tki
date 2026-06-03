import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from './FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    uid: "mock-123",
    displayName: "Syaban Ahmad",
    email: "syaban@gmail.com",
    photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"
  });
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [eduPrepCompleted, setEduPrepCompleted] = useState(false);

  const loginWithGoogle = async () => {
    try {
      // Mock login to bypass Firebase block in simulator
      const mockUser = {
        uid: "mock-123",
        displayName: "Syaban Ahmad",
        email: "syaban@gmail.com",
        photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"
      };
      setCurrentUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error("Mock login error: ", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    // We can still use onAuthStateChanged for persistence, 
    // but the mock user will be lost on hard reload unless we use localStorage.
    // For this prototype, the mock user state is enough.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loginWithGoogle,
    logout,
    userProfile,
    setUserProfile,
    eduPrepCompleted,
    setEduPrepCompleted,
    eduCompleted: eduPrepCompleted,
    setEduCompleted: setEduPrepCompleted
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
