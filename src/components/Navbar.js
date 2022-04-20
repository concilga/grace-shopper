import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({token, setToken, setUser}) => {
    const body = document.body;
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if(currentScroll <= 0) {
            body.classList.remove("scroll-up")
        }

        if(currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-up");
            body.classList.add("scroll-down");
        }

        if(currentScroll < lastScroll && body.classList.contains("scroll-down")) {
            body.classList.remove("scroll-down");
            body.classList.add("scroll-up");
        }


    lastScroll = currentScroll;
})

    return (
        <header className="main-navbar">
            <Link id="link_logo" to="/">
                <img src="" alt="" />
            </Link>
            {token ? (
                <div id="nav">
                    <Link id="nav-link" to="/">Home</Link> 
                    <Link id="nav-link" to="/Beer">Explore</Link>
                    <Link id="nav-link" to="/Account">Account</Link>
                    <Link id="nav-link" to="/Cart">Cart</Link>
                    <Link
                        id="nav-link"
                        to="/"
                        onClick={() => {
                            setToken("");
                            setUser({});
                            localStorage.removeItem("token")
                        }}
                    >Logout</Link>
                </div>
                ) : (
                <div id="nav">
                    <Link id="nav-link" to="/">Home</Link> 
                    <Link id="nav-link" to="/Beer">Explore</Link>
                    <Link id="nav-link" to="/Login">Login</Link>
                </div>
            )}
        </header>
    );
}

export default Navbar;