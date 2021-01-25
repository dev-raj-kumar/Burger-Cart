import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Auxillary from '../../..//hoc/Auxillary';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer , classes.Close];
  if(props.visibility){
    attachedClasses = [classes.SideDrawer , classes.Open];
  }
  return(
    <Auxillary>
      <BackDrop show = {props.visibility} clicked = {props.onOffMethod}/>
    <div className={attachedClasses.join(' ')}>

       <nav >
          <NavigationItems/>
       </nav>
    </div>
    </Auxillary>
  );
};

export default sideDrawer;
