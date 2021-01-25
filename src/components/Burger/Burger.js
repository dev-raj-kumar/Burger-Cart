import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

   let transformedIngred = Object.keys(props.ingredients).map(igKey => {
       return [...Array(props.ingredients[igKey])].map((_, i) =>{
          return <BurgerIngredient key = {igKey + i} type = {igKey} />
       });
   }).reduce((arr,el) => {
       return arr.concat(el);
   } , []);

   if(transformedIngred.length === 0){
     transformedIngred = <p>Please start adding ingredients</p> ;
   }
 console.log(transformedIngred);
  return(
    <div className = {classes.Burger}>
       <BurgerIngredient type = "bread-top" />
       {transformedIngred}
       <BurgerIngredient type = "bread-bottom" />
    </div>
  );
};

export default burger;
