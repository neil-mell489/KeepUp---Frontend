import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Profile from './pages/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import Homepage from './pages/HomePage';
import { useState, useEffect } from 'react';

function App() {
  const URL = 'http://localhost:4000';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (user) => {
    try {
      const signUpURL = `${URL}/api/auth/signup`;
      console.log(`handleSignUp tried using ${signUpURL}`);

      const response = await fetch(signUpURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Sign-up response data:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async (user) => {
    const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log('First occurrence of userId:', data.id); // Log the userId here
    if (response.status !== 200 || !data.token) {
        return data;
    }
    localStorage.setItem("authToken", data.token);
    setIsLoggedIn(true);
    setUser({ id: data.id });
    navigate(`/profile/${data.id}`);
};

  const handleLogout = () => {
    console.log("in handle logout");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const fetchUser = async (id) => {
    // Prevent fetching user data if already fetching
    if (fetchingUser) return;

    // Set fetchingUser to true to prevent multiple requests
    setFetchingUser(true);

    // get logged in user's token
    const token = localStorage.getItem("authToken");
    if (token) {
      const response = await fetch(`${URL}/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": token // bearerHeader variable on the backend
        }
      });
      const data = await response.json();
      setUser(data.data);
      setFetchingUser(false); // Reset fetchingUser after successful fetch
    } else {
      console.log("no token");
      setFetchingUser(false); // Reset fetchingUser if no token
    }
  };

  useEffect(() => {
    // this will help with render UI for Nav when user refreshes the page
    let token = localStorage.getItem("authToken");
    // token doesn't exist in local storage? 
    if (!token) {
      setIsLoggedIn(false); // they are logged out
    } else {
      setIsLoggedIn(true); // they are logged in 
    }
  }, []);

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleNavigation={navigate} />
      <Routes>
        {/* Pass URL to child components */}
        <Route path='/' element={<Signup handleSignUp={handleSignUp} />} />
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp} />} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;

const ProfilePage = () => {
  const { id } = useParams();
  return <Profile id={id} />;
};
