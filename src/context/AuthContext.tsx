import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { logoutUser, MMKVStorage } from "../utils/CommonFunctions";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Initialize auth state on mount
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        // Store token in MMKV
        const token = await firebaseUser.getIdToken();
        MMKVStorage.setString("FirebaseToken", token);
      } else {
        // Clear token on sign out
        MMKVStorage.removeItem("FirebaseToken");
      }
    });

    return unsubscribe;
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      // Check if device has Google Play Services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get user info from Google
      const googleUser = await GoogleSignin.signIn();
      console.log("Google user:", JSON.stringify(googleUser, null, 2));

      // Get idToken from the response
      const idToken = googleUser.data?.idToken || (googleUser as any).idToken;

      if (!idToken) {
        throw new Error("No idToken received from Google Sign-In");
      }

      console.log("idToken:", idToken);

      // Create Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase
      const userCredential =
        await auth().signInWithCredential(googleCredential);

      const firebaseToken = await userCredential.user.getIdToken();
      const userEmail = userCredential.user.email;
      const userName = userCredential.user.displayName;
      const userImage = userCredential.user.photoURL;

      // Store user data in MMKV
      MMKVStorage.setString("FirebaseToken", firebaseToken);
      MMKVStorage.setString("UserEmail", userEmail || "");
      MMKVStorage.setString("UserName", userName || "");
      MMKVStorage.setString("UserImage", userImage || "");

      // Update global token for compatibility
      if (typeof global !== "undefined") {
        (global as any).token = firebaseToken;
      }

      setUser(userCredential.user);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Check if user is authenticated (useful for protected routes)
  const checkAuth = async (): Promise<boolean> => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
    return !!currentUser;
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    signInWithGoogle,
    signOut,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
