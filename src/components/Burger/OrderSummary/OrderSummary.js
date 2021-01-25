import React from 'react';
import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const orderSum = Object.keys(props.ingredients)
  .map(igKey => {
    return(
    <li key ={igKey}>
    <span style = {{textTransform :'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
    </li> );
  });
  return(
    <Auxillary>
    <h3>Your Order</h3>
    <p>A delicious burger with following ingredients : </p>
    <ul>
    {orderSum}
    </ul>
    <p><strong>The price is : {props.price.toFixed(2)}</strong></p>
    <p>Continue to checkOut ? </p>
    <Button btnType="Danger" clicked ={props.purchaseCancel}>CANCEL</Button>
    <Button btnType="Success" clicked = {props.purchaseContinue}>CONTINUE</Button>
    </Auxillary>
  );
};

export default orderSummary;
