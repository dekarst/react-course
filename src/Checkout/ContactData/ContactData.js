import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const { name, email, address } = this.state;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name,
                email,
                address
            },
            deliveryMethod: 'fastest'
        };

        axios.post('orders.json', order).then(
            response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }
        ).catch(error => {
            this.setState({loading: false});
        });

    }

    render() {
        let form = (
            <form>
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="name" placeholder="Your name" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postcode" placeholder="Postcode" />
                <Button clicked={this.orderHandler} type="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;