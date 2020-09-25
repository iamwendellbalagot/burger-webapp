import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderform: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required:true,
                    minLength: 4,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true
            },
        },
        formIsValid: false,
        loader:false
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loader:true});

        const orderFormData = {}
        for (let elementID in this.state.orderform){
            orderFormData[elementID] = this.state.orderform[elementID].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderFormData
        };

        axios.post('/orders.json', order)
        .then(res => {
            console.log(order)
            this.setState({
                loader: false,
            });
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                loader: false,
            });
        });
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderform = {
            ...this.state.orderform
        }
        const updatedFormElement = {
            ...updatedOrderform[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderform[inputIdentifier] = updatedFormElement

        let formValidity = true
        for (let elementID in updatedOrderform){
            formValidity = updatedOrderform[elementID].valid && formValidity
        }
        this.setState({orderform: updatedOrderform, formIsValid: formValidity})
    }

    render() {

        let formElementsArray = []
        for (let key in this.state.orderform){
            formElementsArray.push({
                id: key,
                config: this.state.orderform[key]
            })
        }

        let form = (
            <form >
                {formElementsArray.map(formElement =>(
                    <Input 
                        elementType = {formElement.config.elementType} 
                        elementConfig = {formElement.config.elementConfig} 
                        value = {formElement.config.value}
                        key = {formElement.id}
                        invalid = {!formElement.config.valid}
                        showValidation = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed = {(event)=>this.inputChangedHandler(event, formElement.id)} />
                ))}

                <Button btnType='Success' btnClicked = {this.orderHandler} disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loader){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
