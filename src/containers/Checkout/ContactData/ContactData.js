import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode:''
        },
        loader:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loader:true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'John Balagot',
                address: {
                    city: 'test city',
                    street: 'test street',
                    zipcode: '3948',
                    country: 'Philippines'
                },
                email: 'test@email.com'
            },
            deliveryType: 'fast'
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

    render() {

        let form = (
            <form>
                <input className={classes.Input} name='name'  placeholder= 'Your Name'/>
                <input className={classes.Input} name='email'  placeholder='Your Email'/>
                <input className={classes.Input} name='street'  placeholder= 'Street Address'/>
                <input className={classes.Input} name='postal'  placeholder='Postal Code'/>
                <Button btnType='Success' btnClicked = {this.orderHandler}>ORDER</Button>
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
