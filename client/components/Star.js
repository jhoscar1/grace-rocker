import React from 'react';

export default ({numStars}) => {
    
    const starsToDisplay = [];
    for (let i = 0; i < numStars; i++) {
        starsToDisplay.push(
            <span key={i} className="glyphicon glyphicon-star"></span>
        )
    }
    return (
        <div>
            {starsToDisplay}
        </div>
    )
}