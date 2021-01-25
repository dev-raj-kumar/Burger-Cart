import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
  {label : 'Cheese' , type : 'cheese'},
  {label : 'Bacon' , type : 'bacon'},
  {label : 'Meat' , type : 'meat'},
  {label : 'Salad' , type : 'salad'}
];
const buildControls = (props) => {
   return (
      <div className = {classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => {
         return <BuildControl key = {ctrl.label}  label = {ctrl.label}
                      added = {() => props.addIngredient(ctrl.type)}
                       removed = {() => props.removeIngredient(ctrl.type)}
                       disable = {props.disabledInfo[ctrl.type]}/>;
      })}
      <button className={classes.OrderButton}
        disabled = {!props.purchaseable}
        onClick = {props.ordered}>ORDER NOW</button>
      </div>
   );
};

export default buildControls;
