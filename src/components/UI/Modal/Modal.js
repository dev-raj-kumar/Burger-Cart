import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../BackDrop/BackDrop';
import Auxillary from '../../../hoc/Auxillary';

const modal = (props) => {
  return(
    <Auxillary>
    <Backdrop show = {props.show} clicked = {props.modalClosed}/>
    <div className={classes.Modal}
     style = { {
       transform : props.show ? 'translateY(0)' :'translateY(-100vh)',
       opacity : props.show ? '1' : '0'
     }}>
    {props.children}
    </div>
    </Auxillary>
  );
};

export default modal;