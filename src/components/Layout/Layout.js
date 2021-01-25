import React,{Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    sideDrawerVisibility : false
  };
  sideDrawerVisibilityHandler= (props) => {
    this.setState({
      sideDrawerVisibility : false
    });
  };
  menuClickhandler = () => {
    this.setState((prevstate) => {
      return { sideDrawerVisibility : !prevstate.sideDrawerVisibility}
    });
  };

  render(){
    
    return(
      <Auxillary>
       <Toolbar toggle={this.menuClickhandler}/>
       <SideDrawer visibility = {this.state.sideDrawerVisibility} onOffMethod = {this.sideDrawerVisibilityHandler}/>
       <main className = {classes.Content}>
       {this.props.children}
       </main>
       </Auxillary>
    );
  };
}


  export default Layout;
