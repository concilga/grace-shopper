import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Account = ({ token, user }) => {

  if (!user) {
    return <></>;
  }
  const userName = props.user;
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

  console.log(userBeer);

  const testBeer = {
    favorite: [
      {
        image: "working beer img",
        name: "working beer name",
      },
    ],
  };
  return (
    <>
      <div>
        <h1>Welcome {userName}! Bottom's Up!!!</h1>
      </div>
      <hr></hr>
      <div>
        <h1>Past Purchases</h1>
      </div>
      <hr></hr>
      <div>
        <h1>Favorites</h1> {
        favorite[0] ? (
                favorite.map((beer) => {
                    return (
                        <div key={beer.id} >
                            <div id="beer_img_section">
                                <img src={beer.image} id="beer_img"/>
                            </div>
                            <div id="beer_info_section">
                                <div id="beer_name_section">
                                    <h2 id="beer_name">{beer.name}</h2>
      </div>
      <hr></hr>
      <div>
        <h1>Previously Scored</h1>
      </div>
    </>
  );
};

export default Account;
