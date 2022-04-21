import { useState } from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
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
    if (info.id) {
      setUser(info);
    }
  };
  const fetchBeer = async () => {
    const response = await fetch("/api/beer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();
    setBeer(info);
  };
  useEffect(() => {
    fetchUser();
    fetchBeer();
  }, []);
  return (
    <>
      <Navbar />
      <Route exact path="/" element={<Home />} />
      <Route path="/Beer" element={<Beer beers={beers} />} />
      <Route path="/Account" element={<Account />} />
      <Route
        path="/Login"
        element={<Login token={token} setToken={setToken} />}
      />
      <Route
        path="/Register"
        element={<Register token={token} setToken={setToken} />}
      />
      <Route path="/Cart" element={<Cart />} />
    </>
  );
};
export default App;
