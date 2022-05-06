import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Home = () => {
  return (
      <div className="homePage">
        <h1>
          We are <span>Craft</span>
          <span> Collective</span>
        </h1>
        <button className="button1">
          <Link id="link" to="/Beer">Explore Our Selection Of Craft Beers!</Link>
        </button>
      </div>
  );
};
export default Home;
