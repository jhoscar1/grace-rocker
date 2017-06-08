import React from 'react';
import { Link } from 'react-router';
import Star from './Star';

export default ({review}) => {
    return (
        <div>
            <h3>{review.title}</h3>
            <Star numStars={review.stars} />
            <p>{review.user && review.user.name}</p>
            <p>{review.body}</p>
        </div>
    )
}