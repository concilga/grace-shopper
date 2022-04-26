import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Beer = ({ beers, token }) => {
    if(!beers){
        return(
            <></>
        )
    }

    const [filterTerm, setFilterTerm] = useState(' ');
    const [title, setTitle] = useState('ALL BEERS');
    const [error, setError] = useState('');
    const [displayId, setDisplayId] = useState(null)

    function beerMatches(beer, text) {  
        if (beer.catagories.toLowerCase().includes(text)) {
            return true;
        } else {
            return false;
        }
    }

    const filteredBeer = beers.filter(beer => beerMatches(beer, filterTerm));
    const BeersToDisplay = filterTerm.length ? filteredBeer : beers;

    async function setTitleFunc() {
        if(filterTerm !== ' ') {
            setTitle(filterTerm);
        } else {
            setTitle("ALL BEERS")
        }
    }

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
            }

            if(info.id){
                setError("Item was added to your cart!");
                setDisplayId(beerId);
            }
        } catch(error) {
            setError(error)
        }
    }

    useEffect(() => {
        setTitleFunc();
    }, [filterTerm]);
    
  return (
    <div className="beer-page">
        <div className="beer_header">
            <h1>Explore Our Selection Of Craft Beers!</h1>
            <ul>
                <li>
                    <p onClick={() => setFilterTerm(" ")}>All Beer</p>
                </li>
                <li>
                    <p onClick={() => setFilterTerm("ipa")}>IPA</p>
                </li>
                <li>
                    <p onClick={() => setFilterTerm("hazy ipa")}>Hazy IPA</p>
                </li>
                <li>
                    <p onClick={() => setFilterTerm("imperial ipa")}>Imperial IPA</p>
                </li>
                <li>
                    <p onClick={() => setFilterTerm("assorted ale")}>Assorted Ale</p>
                </li>
                <li>
                    <p onClick={() => setFilterTerm("fruity beer")}>Fruity Beer</p>
                </li>
                <li>
                    <p onClick={() => setFilterTerm("seasonal")}>Seasonal</p>
                </li>
                <li id="ul_last_child">
                    <p onClick={() => setFilterTerm("staff picks")}>Staff Picks</p>
                </li>
            </ul>
        </div>
        <div id="beers">
            <h1 id="beer_section_title">{title}</h1>
        {
            beers[0] ? (
                BeersToDisplay.map((beer) => {
                    return (
                        <div key={beer.id} id="beer_card">
                            <div id="beer_img_section">
                                <img src={beer.image} id="beer_img"/>
                            </div>
                            <div id="beer_info_section">
                                <div id="beer_name_section">
                                    <h2 id="beer_name">{beer.name}</h2>
                                </div>
                                <div id="beer_info">
                                    <p >{beer.abv}% ABV</p>
                                    <p >{beer.brewery}</p>
                                    <p >{beer.style}</p>
                                    <p >${beer.price}</p>
                                </div>
                                <div id="beer_description">
                                    <p>{beer.description}</p>
                                </div>
                                <div>
                                    <button className="button1">
                                        <Link to={`/BeerDetail/${beer.id}`} id="link">Learn More</Link> 
                                    </button>
                                    <button className="button1" onClick={() => handleClick(beer.id, beer.price)}>Add To Cart</button>
                                </div>
                                <div>
                                    {displayId === beer.id ? (
                                        <h3>{error}</h3> 
                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                null
            )
        }
        </div>
    </div>
  );
};
export default Beer;
