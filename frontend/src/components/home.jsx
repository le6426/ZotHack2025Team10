import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../src/firebase";
import "./home.css";

function Home() {
  const [user, setUser] = useState(null); // Store logged-in user info
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Function to sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Function to sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div className="body-container">
        <a href="#" rel="noreferrer">
          <img src="UC_Irvine_Anteaters_logo.svg" className="logo" alt="UCI logo" />
        </a>
      </div>

      <div className="flex-container">
        <h1>PETR<br />CAL</h1>
        <h2>
          <a href="/updates">Start</a>
        </h2>
        <h3 className="caption">Your campus plug for every drop.</h3>

        {!user ? (
          <button className="login" onClick={handleGoogleSignIn}>
            Admin
          </button>
        ) : (
          <div>
            <button className="login" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
