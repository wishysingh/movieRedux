import React from 'react';

const NextPageButton = ({next}) => {
    return (
        <div>
            <button onClick={next}>Next</button>
        </div>
    );
}

export default NextPageButton;
