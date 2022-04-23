import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Account = ({ token, user }) => {
  
  if (!user) {
    return <></>;
  }

  const [userBeer, setUserBeer] = useState({});

  async function fetchUserBeers() {
    const response = await fetch("/api/user_beers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await response.json();

    if(info.name) {
      console.log(info.name);
    }
    
    console.log(info, "info test");
    setUserBeer(info);
  }
  
  useEffect(() => {
    fetchUserBeers();
  }, [token]);
  console.log(userBeer, "userBeer");

  return (
    <div>
      <h1>Working!</h1>
    </div>
  );
};
export default Account;