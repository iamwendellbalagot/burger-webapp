import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';




class BurgerBuilder extends Component {
    state = {
        purchashing: false,
        loader: false
    }

    componentDidMount(){
        
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 
    }


    purchaseHandler = () => {
        this.setState({purchashing:true})
    }

    cancelPurchaseHandler = () =>{
        this.setState({purchashing:false})
    }

    continuePurchaseHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        })
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = <OrderSummary 
                    ingredients = {this.props.ings} 
                    cancelPurchase = {this.cancelPurchaseHandler}
                    continuePurchase = {this.continuePurchaseHandler}
                    price = {this.props.price.toFixed(2)}/>;
        
        if(this.state.loader){
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Burger ingredients={this.props.ings} />
                <Modal show={this.state.purchashing} cancelOrder = {this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price} 
                    ordered = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingrName}),
        onIngredientRemoved: (ingrName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingrName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));