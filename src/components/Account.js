import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Account = ({ token, user }) => {
  console.log(user, "user");
  if (!user) {
    return <></>;
  }
  const { username, profilePic } = user;
  console.log(profilePic);
  const [userBeer, setUserBeer] = useState({});

  async function fetchUserBeers() {
    try{
      const response = await fetch("/api/user_beers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const info = await response.json();
      console.log(info, "info test");
      if (info.name) {
        console.log(info.name);
      }
  
      setUserBeer(info)
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserBeers();
  }, [token]);

  console.log(userBeer, "userBeer");

  // const userBeer = {
  //   favorite: [
  //     {
  //       image: "working beer img",
  //       name: "working beer name",
  //     },
  //   ],
  // };
  if(!userBeer || !userBeer.purchased) {
    return(<>
    </>)
  }
  return (
    <div id="profile_page">
      <div id="header_backgroung">
        <div id="profile_header">
          {/* <div id="profile_photo">
            <img src={profilePic} alt="profilePic"></img>
            <p>Profile Pic</p>
          </div> */}
          <div id="profile_welcome">
            <h1>Welcome {username}! Bottom's Up!!!</h1>
          </div>
        </div>
      </div>
      {/* <hr></hr> */}
      <div id="profile_beer_sections">
        <h1>Your Past Purchases:</h1>
        {userBeer.purchased[0]
          ? userBeer.purchased.map((beer) => {
              return (
                <div key={beer.id} id="profile_beer_card">
                  <div id="profile_beer_img">
                    <img src={beer.image} />
                  </div>
                  <div id="profile_info_section">
                    <h1 id="profile_beer_name">{beer.name}</h1>
                    <h2 id="profile_brewery_name">by {beer.brewery}</h2>
                    <button className="button1">
                      <Link to={`/BeerDetail/${beer.id}`} id="link">Learn More</Link> 
                    </button>
                  </div>
                  <div id="purchase_button">
                    <button className="button1">Purchase Again</button>
                    <button className="button1">Favorite</button>
                    <button className="button1">Score</button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* <hr></hr> */}
      <div id="profile_beer_sections">
        <h1>Your Favorites:</h1>
        {userBeer.favorite[0]
          ? userBeer.favorite.map((beer) => {
              return (
                <div key={beer.id} id="profile_beer_card">
                  <div id="profile_beer_img">
                    <img src={beer.image} />
                  </div>
                  <div id="profile_info_section">
                    <h1 id="profile_beer_name">{beer.name}</h1>
                    <h2 id="profile_brewery_name">{beer.brewery}</h2>
                    <button className="button1">
                      <Link to={`/BeerDetail/${beer.id}`} id="link">Learn More</Link> 
                    </button>
                  </div>
                  <div id="purchase_button">
                    <button className="button1">Add To Cart</button>
                    <button className="button1">Un-Favorite</button>
                    <button className="button1">Score</button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* <hr></hr> */}
      <div id="profile_beer_sections">
        <h1>Your Previously Scored:</h1>
        {userBeer.scored[0]
          ? userBeer.scored.map((beer) => {
              return (
                <div key={beer.beer.id} id="profile_beer_card">
                  <div id="profile_beer_img">
                    <img src={beer.beer.image} />
                  </div>
                  <div id="profile_info_section">
                    <h1 id="profile_beer_name">{beer.beer.name}</h1>
                    <h2 id="profile_brewery_name">{beer.beer.brewery}</h2>
                    <div id="user_score">
                      <p>Your Score:</p>
                      <h1>{beer.score}</h1>
                    </div>
                    <button className="button1">
                      <Link to={`/BeerDetail/${beer.beer.id}`} id="link">Learn More</Link> 
                    </button>
                  </div>
                  <div id="purchase_button">
                    <button className="button1">Add To Cart</button>
                    <button className="button1">Favorite</button>
                    <button className="button1">Change Score</button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Account;
