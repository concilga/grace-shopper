import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link, useParams, useNavigate } from 'react-router-dom';

const PostDetail = ({beer, token, user}) => {  
    const {id} = useParams();

    if (!beer) {
        return (
            <></>
        )
    }

    const individualBeer = beer.filter(
        (beer) => beer.id === id
    );

}