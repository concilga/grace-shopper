import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Account = ({ token, user }) => {
  
  if (!user) {
    return <></>;
  }

  const [userBeer, setUserBeer] = useState({});

  async function fetchUserBeers() {
    const response = await fetch("/api/user_beers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const info = await response.json();
    console.log(info, "info test");
    if(info.name) {
      console.log(info.name);
    }
    
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