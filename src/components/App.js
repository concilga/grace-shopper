import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Beer from "./Beer";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Home from "./Home";
import Account from "./Account";
import BeerDetail from "./BeerDetail";
import Cart from "./Cart";


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

    if(info.name){
      console.log(info.name);
    }

    console.log(info, "test1");
    if(info.id) {
        console.log(info, "test2");
        setUser(info);
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

        <Route path="/Beer" element={<Beer beers={beers} token={token} />} />

        <Route path="/BeerDetail/:id"
           element={ <BeerDetail beers={beers} token={token} user={user}/> }
        />

        <Route
          path="/Login"
          element={<Login token={token} setToken={setToken} />}
        />

        <Route path="/Account"
          element={ <Account beers={beers} user={user} token={token}/> }
        />

        <Route path="/Register"
          element={ <Register token={token} setToken={setToken}/> }
        />

      <Route path="/Cart"
        element={ <Cart token={token} user={user}/> }
      />  
    </Routes>
    </>
  );
};

export default App;
