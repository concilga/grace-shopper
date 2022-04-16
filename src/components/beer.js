import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Beers = ({ getAllBeers}) => {

  return (
    <div className="beer-page">
        <h2>Beers</h2>
        {
          getAllBeers[0] ? (
              beersToDisplay.map((beer) => {
              return (
                  <div key={beer.id} id="card">
                      <h2 id="name">{beer.name}</h2>
                      <p >{beer.description}</p>
                      <p >{beer.image}</p>
                      <p >{beer.abv}</p>
                      <p >{beer.brewery}</p>
                      <p >{beer.style}</p>
                      <p >{beer.price}</p>
                      </div>
              )})
      
    </div>
           

export default Beers;