import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import Homepage from './pages/HomePage';
import { useState, useEffect } from 'react';



function App() {
  const URL = process.env.REACT_APP_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async(user) => {
    const response = await fetch(`${URL}/api/auth/signup` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user) 
    });
    const data = await response.json();
    console.log(data);
    navigate("/login");
  };

  const handleLogin = async(user) => {
    console.log(URL)
    const response = await fetch(`${URL}/api/auth/login` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data);
    // if status is NOT 200(OK)
    if(response.status !== 200 || !data.token){
      return data;
    }
    localStorage.setItem("authToken", data.token);
    setIsLoggedIn(true);
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
    if(token){
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

  useEffect(()=>{
    // this will help with render UI for Nav when user refreshes the page
    let token = localStorage.getItem("authToken");
    // token doesnt exist in local storage? 
    if(!token){
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
        <Route path='/login' element={<Login handleLogin={handleLogin}  />} />
        <Route path='/profile/:id' element={<Profile fetchUser={fetchUser} user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
