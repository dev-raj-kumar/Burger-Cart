import React , {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary';
const errorHandler = (WrappedComponents , axios) => {
  return class extends Component{
    state = {
      error : null
    };
      componentWillMount(){
          axios.interceptors.request.use(req => {
            this.setState({
              error : null
            });
            return req;
          });
          axios.interceptors.response.use(res => res, error => {
            this.setState({
              error : error
            });
          });
      }
     errorConfirmHandler = props => {
       this.setState({
         error : null
       });
     };
    render(){
      return(
        <Auxillary>
            <Modal show = {this.state.error} modalClosed = {this.errorConfirmHandler}>
                {this.state.error ? this.state.error.message  : null}
            </Modal>
            <WrappedComponents {...this.props} />
        </Auxillary>
       );
    };
  };

};

export default errorHandler;
