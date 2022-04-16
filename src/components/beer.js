import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Beers = ({token, getAllBeers, user}) => {
 

  return (
    <div className="beer-page">
      <div className="beer-header">
        <h2>Beers</h2>
        
      <div id="cards">
        {
          getAllBeers[0] ? (
              beersToDisplay.map((beer) => {
              return (
                  <div key={beer.id} id="card">
                      <h2 id="name">{routine.name}</h2>
                      <div id="goal_section">
                        <p id="goal-title">Goal:</p>
                        <p id="goal">{routine.goal}</p>
                      </div>
                    </div>
                    <div id="activ_section">
                      <h3>Activities:</h3>
                      {routine.activities[0] ? (
                        <div id="activ_cards">
                          {routine.activities.map((activity) => {
                            return (
                              <div key={activity.id} id="activ_card">
                                <div id="activ-head">
                                  <p id="activities">Activity: {activity.name}</p>
                                </div>
                                <p id="description">Description: {activity.description}</p>
                                <p id="count">Count: {activity.count}</p>
                                <p id="duration">Duration: {activity.duration}</p>
                              </div>
                            );
                          })}
                       
                      ) : (
                        <div id="miss-activ">
                          <img src="/images/No-Activities-Art.png" alt=""/>
                        </div>
                      )}
                    </div>
                    <p id="creator">Creator: {routine.creatorName}</p>
                  </div>
              );
              })
          ) : (
              null
          )
        }
      </div>
    </div>
  );
};
export default Routines;