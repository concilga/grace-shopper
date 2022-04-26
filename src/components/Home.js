import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Home = () => {
  return (
    <>
      <div class="logo">
        <img src="HPL.jpg" />
      </div>
      <div className="homePage">
        <h1>
          We are <span>4 STAR</span>
          <span> Beers</span>
        </h1>
        <Link to="/Beer">Explore</Link>
        {/* <a href="#">Browse Our Selection</a> */}
      </div>
    </>
  );
};
export default Home;
