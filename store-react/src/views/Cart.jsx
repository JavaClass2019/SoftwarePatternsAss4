import React from "react";
import { connect } from "react-redux";
// reactstrap components
import { Container, Row, Button } from "reactstrap";

//import axios from 'axios';

// core components
import Navbar from "components/Navbars/Navbar.jsx";
import CartItem from "components/CartItem";

import { checkout } from '../actions/index'

class Cart extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: ""
  };

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }

  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  checkout = _ => {
    this.props.checkout({ user_id: this.props.userId, products: this.props.items.map(item => item.id) })
    this.props.history.push('/products')
  }

  render() {
    return (
      <>
        <Navbar history={ this.props.history } />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  {this.props.items.map((product, idx) => (
                    <CartItem
                      index={idx}
                      key={product.id}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </Row>
                { this.props.items.length > 0 && (<Row> <Button onClick={ this.checkout } className="btn-round" color="success" size="lg">Checkout</Button> </Row>) }
                { this.props.items.length === 0 && (<Row> <p>Sob, sob, no items in the cart.</p></Row>) }
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.cart, userId: state.user.id };
};

const mapDispatchToProps = dispatch => {
  return { checkout: payload => dispatch(checkout(payload)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
