import React from "react";
import { connect } from "react-redux";
// reactstrap components
import { Container, Row } from "reactstrap";

import axios from "axios";

// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Product from "../../components/Admin/Product.jsx";

import { addCartItem } from "../../actions/index";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares1to6: "",
      squares7and8: "",
      products: []
    };

    this.archiveProduct = this.archiveProduct.bind(this);
  }

  async componentWillMount() {
    this.setState({ products: await this.fetchProducts() });
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }

  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  async fetchProducts() {
    try {
      const products = await axios.get(
        `${process.env.REACT_APP_API_URL}/products`
      );
      return products.data;
    } catch (e) {
      console.log(e.message);
    }
    return [];
  }

  async archiveProduct(productId) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/products/${productId}`
    );
    if (response.status === 204) {
      this.setState({
        products: this.state.products.filter(
          product => product.id !== productId
        )
      });
    }
  }

  render() {
    return (
      <>
        <Navbar history={this.props.history} />
        <div
          className="wrapper"
        >
          <div className="content">
            <Container>
              <Row>
                {this.state.products.map((product, idx) => (
                  <Product
                    index={idx}
                    archiveProduct={this.archiveProduct}
                    img={product.img_url}
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                  />
                ))}
              </Row>
              {this.state.products.length === 0 && (
                <Row>
                  {" "}
                  <p>Sob, sob, no products to look at.</p>
                </Row>
              )}
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
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addCartItem: item => dispatch(addCartItem(item)) };
};

export default connect(
  null,
  mapDispatchToProps
)(Products);
