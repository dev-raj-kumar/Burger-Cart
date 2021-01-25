import React , {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/ErrorHandling/ErrorHandling';

const PRICING = {
   salad : 0.3,
   cheese : 0.5,
   bacon : 0.7,
   meat : 1.3
};
class BurgerBuilder extends Component {

  state = {
    ingredients : null,
    price : 0,
    purchaseable : false,
    purchasing : false,
    loading : false,
    error : false
  };

componentDidMount(){
  axios.get('https://react-my-burger-2d7ea.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients : response.data
        });
      })
      .catch(error => {
        this.setState({
          error : true
        });
      });
}
updatePurchaseState(ingredients){

  const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum,el)=>{
        return sum+el;
      },0);
    this.setState({
      purchaseable : sum > 0
    });
}
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients
    };
    updateIngredient[type] = newCount;
    const addPrice = PRICING[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + addPrice;

    this.setState({
      ingredients : updateIngredient,
      price : newPrice
    });
    this.updatePurchaseState(updateIngredient);
  };

  removeIngredientHandler = (type) => {
     const oldCount = this.state.ingredients[type];
     if(oldCount <= 0)
     return;
     const newCount = oldCount - 1;
     const updateIngredient = {
       ...this.state.ingredients
     };
     updateIngredient[type]= newCount;
     const subPrice = PRICING[type];
     const oldPrice = this.state.price;
     const newPrice = oldPrice - subPrice;
     this.setState({
       ingredients : updateIngredient,
       price : newPrice
     });
     this.updatePurchaseState(updateIngredient);
  };

  purchaseHandler = ()=>{
    this.setState({
      purchasing:true
    });
  };
  purchaseCancelhandler = ()=>{
    this.setState({
      purchasing:false
    });
  };
  purchaseContinueHandler = ()=>{
     //alert("You have purchased");
     this.setState({
       loading : true
     });
     const order = {
       ingredients : this.state.ingredients,
       price : this.state.price,
       customer : {
            name : 'Devraj',
            address : {
               street : 'Bihar Street',
               pinCode : '52672829',
               country : 'India'
            },
            email : 'bihar@bihar.com'
          },
      deliveryMethod : 'fastest'
    };
     axios.post('/orders.json',order)
     .then(response => this.setState({
       loading : false,
       purchasing : false
     }))
     .catch(error => {
       console.log(error);
       this.setState({
         loading : false,
         purchasing : false
       });
     });
  };
   render(){
     const disabledInfo = {
       ...this.state.ingredients
     };
     let orderSummary = null;


      let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>;
      if(this.state.ingredients){
        burger = (
                    <Auxillary>
                 <Burger ingredients = {this.state.ingredients}/>
                  <BuildControls addIngredient = {this.addIngredientHandler}  removeIngredient = {this.removeIngredientHandler}
                    disabledInfo = {disabledInfo}
                    purchaseable = {this.state.purchaseable}
                    ordered = {this.purchaseHandler}
                    price = {this.state.price}/>
                   </Auxillary>
              );
       orderSummary =  (<OrderSummary
               price = {this.state.price}
                 purchaseContinue = {this.purchaseContinueHandler}
                 purchaseCancel = {this.purchaseCancelhandler}
                 ingredients={this.state.ingredients}/> );
      }
      if(this.state.loading){
        orderSummary = <Spinner/>;
      }

     for(let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key] <= 0;
     }

     return(
       <Auxillary>
         <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelhandler}>
            {orderSummary}
         </Modal>
         {burger}
       </Auxillary>
     );
   }
}

export default withErrorHandling(BurgerBuilder,axios);
