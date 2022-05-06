import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link, useParams, useNavigate } from 'react-router-dom';

const BeerDetail = ({token, user}) => {  
    const {id} = useParams();
    const [beers, setBeers] = useState([]);
    const [error, setError] = useState('');

    const fetchBeer = async () => {
        const response = await fetch("/api/beer");
        const info = await response.json();
        setBeers(info);
    };

    useEffect(() => {
        fetchBeer();
    }, [token]);
   
    if (!beers[0]) {
        return (
            <></>
        )
    }

    
    const individualBeer = beers.filter(
        (beer) => beer.id == id
    );

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
            }
        } catch(error) {
            setError(error)
        }
    }

    async function handleFavClick() {
        setError("Beer Was Added to your Favorites!") 
    }

    async function handleScoreClick(e) {
        setError("Beer Was Added to your Scored!");
        e.preventDefault();
    }
    
    return (
        <div id="ibeer_detail_page">
            <div id="ibeer_background">
                <img src={individualBeer[0].background}></img>
            </div>
            <div id="ibeer_image">
                <img src={individualBeer[0].image}></img>
            </div>
            <div id="ibeer_name_section">
                <h1 id="ibeer_title">
                    {individualBeer[0].name}
                </h1>
                <div id="ibeer_info_btns">
                    <button className="button1" onClick={() => handleClick(individualBeer[0].id, individualBeer[0].price)}>
                        Add To Cart
                    </button>
                    <button className="button1" onClick={() => handleFavClick()}>
                        Favorite
                    </button>
                    <form>
                        <input required type='text' name='username'/>
                        <button className="button1" onClick={(e) => handleScoreClick(e.target)}>
                            Score
                        </button>
                    </form>
 
                </div>
                <h2>{error}</h2>
            </div>
            <div id="ibeer_info_section">
                <div id="ibeer_info_description">
                    <h3>Brewers Note's</h3>
                    <p>{individualBeer[0].description}</p>
                </div>
                <div id="ibeer_info_detail">
                    <div id="itop-detail">
                        <div id="iabv">
                            <p id="title_p">ABV:</p>
                            <p id="data_p">{individualBeer[0].abv}%</p> 
                        </div>
                        <div id="istyle">
                            <p id="title_p">Style:</p>
                            <p id="data_p">{individualBeer[0].style}</p>
                        </div>
                    </div>
                    <div id="ibottom-detail">
                       <div id="ibrewery">
                            <p id="title_p">Brewery:</p>
                            <p id="data_p">{individualBeer[0].brewery}</p>
                        </div>
                        <div id="iprice">
                            <p id="title_p">Price</p>
                            <p id="data_p">${individualBeer[0].price}</p>
                        </div> 
                    </div>   
                </div>
            </div>
        </div>
    );
}

export default BeerDetail;