import React from "react";
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

class CartItem extends React.Component {
  render() {
    return (
      <Col className="col-sm">
        <Card className="card-register">
          <CardHeader>
            <CardImg alt="..." src={require("assets/img/square-purple-1.png")} />
            <CardTitle tag="h6">{ this.props.name }</CardTitle>
          </CardHeader>
          <CardBody />
          <CardFooter>
            <Button className="btn-round" color="primary" size="lg" >
              Price: { this.props.price }
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default CartItem;