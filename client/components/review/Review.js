import React from 'react';
import { Link } from 'react-router';
import Star from './Star';

export default ({review}) => {
    return (
        <div>
            <h4>{review.title}</h4>
            <Star numStars={review.stars} />
            <p>By {review.user && review.user.name} on {review.date}</p>
            <p>{review.body}</p>
        </div>
    )
}