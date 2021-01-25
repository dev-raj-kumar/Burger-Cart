import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../UI/Menu/Menu';

const toolbar = (props) => {
  return(
    <header className={classes.Toolbar}>
       <Menu toggle = {props.toggle}/>
       <div className={classes.Logo}>
          <Logo/>
       </div>
       <nav className={classes.DesktopOnly}>
         <NavigationItems/>
       </nav>
    </header>
  );
};

export default toolbar;
