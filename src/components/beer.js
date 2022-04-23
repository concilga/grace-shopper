import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Beer = ({ beers }) => {
  return (
    <div className="beer-page">
      <div className="beer_header">
        <h1>Explore Our Selection Of Craft Beers!</h1>
        <ul>
          <li>
            <a>IPA</a>
          </li>
          <li>
            <a>Hazy IPA</a>
          </li>
          <li>
            <a>Imperial IPA</a>
          </li>
          <li>
            <a>Assorted Ale</a>
          </li>
          <li>
            <a>Fruity Beer</a>
          </li>
          <li>
            <a>Seasonal</a>
          </li>
          <li id="ul_last_child">
            <a>Staff Picks</a>
          </li>
        </ul>
      </div>
      <div id="beers">
        <h1 id="beer_section_title">All Beer</h1>
        {beers[0]
          ? beers.map((beer) => {
              return (
                <div key={beer.id} id="beer_card">
                  <div id="beer_img_section">
                    <img src={beer.image} id="beer_img" />
                  </div>
                  <div id="beer_info_section">
                    <div id="beer_name_section">
                      <h2 id="beer_name">{beer.name}</h2>
                    </div>
                    <div id="beer_info">
                      <p>{beer.abv}% ABV</p>
                      <p>{beer.brewery}</p>
                      <p>{beer.style}</p>
                      <p>${beer.price}</p>
                    </div>
                    <div id="beer_description">
                      <p>{beer.description}</p>
                    </div>
                    <div>
                      <button className="button1">
                        <Link to={`/BeerDetail/${beer._id}`} id="link">
                          Learn More
                        </Link>
                      </button>
                      <button className="button1">Add To Cart</button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default Beer;
