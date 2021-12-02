import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Button from '../General/Button';
import Spinner from '../General/Spinner';
import { withRouter } from 'react-router-dom';
import * as actions from "../../redux/actions/orderActions"

import css from './style.module.css';

const ContactData = (props) => {
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [street, setStreet] = useState(null);  
    
    
    useEffect(() => {
        if ( props.newOrderStatus.finished && !props.newOrderStatus.error)
            props.history.replace('/orders')
    });

    const saveOrder =() =>{         
        const newOrder = {
            userId: props.userId,
            orts: props.ingredients,
            dun: props.price, 
            hayag: {
                name,
                city,
                street
            }
        }
        props.saveOrderAction(newOrder)        
    }

    const changeName =(e) =>{
            setName(e.target.value)
    }
    
    const changeStreet =(e) =>{
        setStreet(e.target.value)
    }
    
    const changeCity =(e) =>{
        setCity(e.target.value)
    }
    
    return <div className={css.ContactData}>            
        Дүн : { props.price} ₮
        <div>
            {props.newOrderStatus.error && `Захиалгыг хадгалах явцад алдаа гарлаа: `}
        </div>

        {props.newOrderStatus.saving ? <Spinner /> : (
            <div>
                <input onChange = {changeName} type="text" name="name" placeholder = "Таны нэр" />

                <input onChange = {changeStreet} type="text" name="street" placeholder = "Таны гэрийн хаяг" />

                <input onChange = {changeCity}  type="text" name="city" placeholder = "Таны хот" />

                <Button text="Илгээх" btnType="Success" daragdsan={saveOrder}/>
            </div>
        )}           
    </div>;
    
}

const mapStateToProps = state => {
    return { 
        price: state.burgerReducer.totalPrice,
        ingredients: state.burgerReducer.ingredients,
        newOrderStatus: state.orderReducer.newOrder,
        userId: state.signupReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));