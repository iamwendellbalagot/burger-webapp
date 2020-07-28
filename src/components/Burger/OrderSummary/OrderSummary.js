import React, { Component } from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //Should be a functional compent, just turned it into a classbase to check lifecycle hooks

    // componentWillUpdate(){
    //     console.log('[OrderSummary] will update')
    // }


    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li>
        });
        return(
            <Aux>
                <h3>Your Order:</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    <span style = {{textTransform: 'capitalize'}}>{ingredientSummary}</span>
                </ul>
                <p><strong>Total Price: {this.props.price}$</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType = 'Danger' btnClicked = {this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType = 'Success' btnClicked = {this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        );
    };
}


export default OrderSummary;