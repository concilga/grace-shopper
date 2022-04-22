import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Beer from "./Beer";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import Account from "./Account";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [beers, setBeer] = useState([]);

  const fetchUser = async () => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setToken(isToken);
    }
    const response = await fetch("/api/users/me", {
      headers: {
        Authorization: `Bearer ${isToken}`,
      },
    });
    const info = await response.json();

    console.log(info.user, "test1");
    if(info.user) {
        console.log(info.user, "test2");
        setUser(info.user);
    }
  };

  const fetchBeer = async () => {
    const response = await fetch("/api/beer");
    const info = await response.json();
    setBeer(info);
  };

  useEffect(() => {
    fetchUser();
    fetchBeer();
  }, [token]);

  return (
    <>
      <Navbar token={token} setToken={setToken} setUser={setUser} />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/Beer" element={<Beer beers={beers} />} />

        <Route path="/Account" element={<Account user={user} />} />

        <Route
          path="/Login"
          element={<Login token={token} setToken={setToken} />}
        />

        <Route
          path="/Register"
          element={<Register token={token} setToken={setToken} />}
        />

        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
