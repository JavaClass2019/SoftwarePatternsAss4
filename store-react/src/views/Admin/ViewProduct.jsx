import React from "react";

// reactstrap components
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Row,
  Container
} from "reactstrap";

import Axios from "axios";

import Navbar from '../../components/Navbars/Navbar';

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  async componentWillMount() {
    this.setState({
      product: await this.fetchProduct(this.props.location.data.productId)
    });
  }

  async fetchProduct(productId) {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/products/${productId}`
      );
      return response.data;
    } catch (e) {
      console.error(e.message);
      return {};
    }
  }
  render() {
    return (
      <>
        <Navbar history={this.props.history} />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row style={{ zIndex: 9000 }}>
                  <Col className="col-sm">
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h6">
                          {this.state.product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardBody />
                      <CardFooter>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                {Object.keys(this.state.product).length === 0 && (
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
        </div>
      </>
    );
  }
}

export default ViewProduct;
