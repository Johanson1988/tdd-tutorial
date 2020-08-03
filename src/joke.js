import React from 'react';

export const Joke = ({ text }) => {
    return(
        <div data-testid="joke-text">
            {text}
        </div>
    )
};