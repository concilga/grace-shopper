import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Beer = ({ beers }) => {

  return (
    <div className="beer-page">
        <h2>Beers</h2>
        {
            beers[0] ? (
                beers.map((beer) => {
                    return (
                        <div key={beer.id} id="card">
                        <h2 id="name">{beer.name}</h2>
                        <p >{beer.description}</p>
                        <img src={beer.image}/>
                        <p >{beer.abv}</p>
                        <p >{beer.brewery}</p>
                        <p >{beer.style}</p>
                        <p >{beer.price}</p>
                        </div>
                    )
                })
            ) : (
                null
            )
        }
      
    </div>
  );         
}
export default Beer;