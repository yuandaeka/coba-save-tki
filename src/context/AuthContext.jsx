import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from './FirebaseConfig';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

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
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Firebase Google redirect error: ", error);
      throw error;
    }
  };

  const registerWithEmail = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      const updatedUser = {
        uid: result.user.uid,
        displayName: displayName,
        email: result.user.email,
        photoURL: result.user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"
      };
      
      setCurrentUser(updatedUser);
      
      // Auto enroll in biometrics after successful registration
      localStorage.setItem('hasBiometric', 'true');
      localStorage.setItem('biometricUser', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error("Firebase registration error: ", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
      
      // Auto enroll in biometrics after successful login
      localStorage.setItem('hasBiometric', 'true');
      localStorage.setItem('biometricUser', JSON.stringify({
        uid: result.user.uid,
        displayName: result.user.displayName || result.user.email,
        email: result.user.email,
        photoURL: result.user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"
      }));
      
      return result.user;
    } catch (error) {
      console.error("Firebase email login error: ", error);
      throw error;
    }
  };

  const loginWithBiometric = async () => {
    const hasBiometric = localStorage.getItem('hasBiometric');
    const biometricUserStr = localStorage.getItem('biometricUser');
    
    if (hasBiometric === 'true' && biometricUserStr) {
      const bioUser = JSON.parse(biometricUserStr);
      setCurrentUser(bioUser);
      return bioUser;
    } else {
      throw new Error("Biometrik belum diaktifkan. Silakan daftar atau login terlebih dahulu.");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    // Process redirect result on load
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          localStorage.setItem('hasBiometric', 'true');
          localStorage.setItem('biometricUser', JSON.stringify({
            uid: result.user.uid,
            displayName: result.user.displayName || result.user.email,
            email: result.user.email,
            photoURL: result.user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"
          }));
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });

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
    registerWithEmail,
    loginWithEmail,
    loginWithBiometric,
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
