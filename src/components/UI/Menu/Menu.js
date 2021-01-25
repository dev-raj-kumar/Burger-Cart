import React from 'react';
import classes from './Menu.module.css';

const menu = (props) =>{
  return(
    <div onClick = {props.toggle} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default menu;
