import React from "react";

import { connect } from 'react-redux'
// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";

import axios from 'axios';

// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Purchase from "components/Purchase.jsx";

class Purchases extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: "",
    purchases: []
  };

  async componentWillMount () {
    this.setState({ purchases: await this.fetchPurchases() })
  }

  componentDidMount () {
    document.body.classList.toggle("register-page");
  }

  componentWillUnmount () {
    document.body.classList.toggle("register-page");
  }

  async fetchPurchases () {
    try {
      const products = await axios.get(`http://localhost:3001/users/${this.props.userId}/purchases`)
      return products.data
    } catch (e) {
      console.log(e.message)
    }
    return []
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
                <Row style={{zIndex: 9000}}>
                  { this.state.purchases.map(
                      (purchase) => (<Purchase name={purchase.product.name} price={purchase.product.price} date={purchase.created_at} key={ purchase.id } />)
                    )
                  }
                </Row>
                { this.state.purchases.length === 0 && (<Row> <p>Sob, sob, try to buy something.</p></Row>) }
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
  return { userId: state.user.id }
}

export default connect(mapStateToProps)(Purchases)