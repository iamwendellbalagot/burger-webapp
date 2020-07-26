import React from 'react';

import Aux from '../../../hoc/Auxillary'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
            return <li key={igKey}>{igKey}: {props.ingredients[igKey]}</li>
        });

    return(
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                <span style = {{textTransform: 'capitalize'}}>{ingredientSummary}</span>
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default orderSummary;