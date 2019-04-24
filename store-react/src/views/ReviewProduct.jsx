import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import axios from "axios";

import Slider from 'nouislider'

// core components
import Navbar from "components/Navbars/Navbar.jsx";

class ReviewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.reviewProduct = this.reviewProduct.bind(this);
    this.state = {
      squares1to6: "",
      squares7and8: "",
      review: {
        body: "",
        rating: ""
      },
      showAlert: false,
      errorMessage: ""
    };
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");

    const ratingSlider = this.refs.ratingSlider;
    Slider.create(ratingSlider, {
      start: [0],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 5 }
    });
  }

  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  handleInputChange = event => {
    const data = {};
    data[event.target.id] = event.target.value;
    const review = this.state.review;
    this.setState({ review: Object.assign(review, data) });
  };

  async reviewProduct() {
    if (this.inputIsValid()) {
      try {
        const response = await axios.post(
          `http://localhost:3001/products/${this.props.location.data.product_id}/reviews`,
          {
            body: this.state.review.body,
            rating: parseInt(document.getElementById('slider').noUiSlider.get()),
            user_id: this.props.location.data.user_id
          }
        );
        if (response.status === 201) this.props.history.push("/products");
        else this.toggleErrorAlert("An internal server error occured.");
      } catch (e) {
        console.error(e.message);
        this.toggleErrorAlert("There was a problem adding the review.");
      }
    } else this.toggleErrorAlert("Invalid form submission.");
  }

  inputIsValid = () => {
    return this.state.review.body.length > 0;
  };

  toggleErrorAlert = message => {
    const THREE_SECONDS = 3000;
    this.setState({ showAlert: true, errorMessage: message });
    setTimeout(_ => {
      this.setState({ showAlert: false, errorMessage: "" });
    }, THREE_SECONDS);
  };

  render() {
    return (
      <>
        <Navbar history={this.props.history} />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">+ Review</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-bold" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Write your review here..."
                              type="textarea"
                              id="body"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          <InputGroup className="mt-4">
                            * <Col xs={12} md={12}><div id="slider" className="slider slider-primary" ref="ratingSlider" /></Col>
                          </InputGroup>
                          {this.state.showAlert && (
                            <p style={{ color: "crimson" }}>
                              {this.state.errorMessage}
                            </p>
                          )}
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button
                          className="btn-round"
                          color="primary"
                          size="lg"
                          onClick={this.reviewProduct}
                        >
                          Review
                        </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
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
                  className="square square-5"
                  id="square5"
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

export default ReviewProduct;