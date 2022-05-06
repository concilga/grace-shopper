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
  const [error, setError] = useState('');
  const [displayId, setDisplayId] = useState(null)


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

  async function handleClick(beerId, price) {
    try {
        setError('');

        if(!token) {
            setError("You must be logged in to add an item to your cart!")
            return;
        }

        const response = await fetch('/api/cart_beers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    beerId,
                    price
                }
            )
        })
        const info = await response.json();
        console.log(info);

        if(!info.id) {
          setError("There was an error, unable to add Item to your Cart")
          setDisplayId(beerId);
        }

        if(info.id){
            setError("Item was added to your cart!");
            setDisplayId(beerId);
        }
    } catch(error) {
        setError(error)
    }
}

async function handleFavClick(beerId) {
  setDisplayId(beerId);
  setError("Beer Was Added to your Favorites!") 
}

async function handleScoreClick(beerId) {
  setDisplayId(beerId);
  setError("Beer Was Added to your Scored!");
}


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
                    <button className="button1" onClick={() => handleClick(beer.id, beer.price)}>Purchase Again</button>
                    <button className="button1" onClick={() => handleFavClick(beer.id)}>
                        Favorite
                    </button>
                    <form>
                        <input required type='text' name='username'/>
                        <button className="button1" onClick={() => handleScoreClick(beer.id)}>
                            Score
                        </button>
                    </form>
                  </div>
                  <div>
                    {displayId === beer.id ? (
                        <h3>{error}</h3> 
                    ) : (
                        null
                    )}
                  </div>
                </div>
              );
            })
          : <div id="empty-message">
              <h1 >You have not purchased any beers yet!!!</h1>
              <p>Hit the button below to explore our amazing selection of beers!</p>
              <button className="button1">
                <Link id="link" to="/Beer">Explore</Link>
              </button>
            </div>}
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
                    <button className="button1" onClick={() => handleClick(beer.id, beer.price)}>Add To Cart</button>
                    <button className="button1" onClick={() => handleFavClick(beer.id)}>
                        Un-Favorite
                    </button>
                    <form>
                        <input required type='text' name='username'/>
                        <button className="button1" onClick={() => handleScoreClick(beer.id)}>
                            Score
                        </button>
                    </form>
                  </div>
                  <div>
                    {displayId === beer.id ? (
                        <h3>{error}</h3> 
                    ) : (
                        null
                    )}
                  </div>
                </div>
              );
            })
          : <div id="empty-message">
              <h1 >You have not favorited any beers yet!!!</h1>
              <p>Hit the button below to explore our amazing selection of beers!</p>
              <button className="button1">
                <Link id="link" to="/Beer">Explore</Link>
              </button>
            </div>}
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
                    <button className="button1" onClick={() => handleClick(beer.id, beer.price)}>Add To Cart</button>
                    <button className="button1" onClick={() => handleFavClick(beer.id)}>
                        Favorite
                    </button>
                    <form>
                        <input required type='text' name='username'/>
                        <button className="button1" onClick={() => handleScoreClick(beer.id)}>
                            Score
                        </button>
                    </form>
                  </div>
                  <div>
                    {displayId === beer.id ? (
                        <h3>{error}</h3> 
                    ) : (
                        null
                    )}
                  </div>
                </div>
              );
            })
            
          : <div id="empty-message">
              <h1 >You have not scored any beers yet!!!</h1>
              <p>Hit the button below to explore our amazing selection of beers!</p>
              <button className="button1">
                <Link id="link" to="/Beer">Explore</Link>
              </button>
            </div>}
      </div>
    </div>
  );
};

export default Account;
