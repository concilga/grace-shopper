import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link, useParams, useNavigate } from 'react-router-dom';

const BeerDetail = ({token, user}) => {  
    const {id} = useParams();
    const [beers, setBeers] = useState([]);

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
                    <button className="button1">
                        Add To Cart
                    </button>
                    <button className="button1">
                        Favorite
                    </button>
                    <button className="button1">
                        Score
                    </button>
                </div>
            </div>
            <div id="ibeer_info_section">
                <div id="ibeer_info_description">
                    <p>{individualBeer[0].description}</p>
                </div>
                <div id="ibeer_info_detail">
                    <div id="ibeer_info">
                        <p>{individualBeer[0].abv}% ABV</p>
                        <p>{individualBeer[0].brewery}</p>
                        <p>{individualBeer[0].style}</p>
                        <p>${individualBeer[0].price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeerDetail;