import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

// reactstrap components
import {
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle
} from "reactstrap";

class Product extends React.Component {
  render() {
    return (
      <Col className="col-sm">
        <Card className="card-register">
          <CardHeader>
            <CardImg
              alt="..."
              src={require("assets/img/square-purple-1.png")}
            />
            <CardTitle tag="h6">{this.props.name}</CardTitle>
          </CardHeader>
          <CardBody />
          <CardFooter>
            <Button
              className="btn-round"
              color="primary"
              size="sm"
              onClick={_ => {
                this.props.addToCart(this.props.index);
              }}
            >
              + Cart ({this.props.price})
            </Button>
            <NavLink to={{ pathname: '/review-product', data: { product_id: this.props.id, user_id: this.props.userId } }}>
              <Button className="btn-round" color="primary" size="sm">
                Review
              </Button>
            </NavLink>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.user.id };
};

export default connect(mapStateToProps)(Product);
