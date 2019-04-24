import React from "react";
// reactstrap components
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle
} from "reactstrap";

class Purchase extends React.Component {
  render() {
    return (
      <Col className="col-sm">
        <Card className="card-register">
          <CardHeader>
            <CardImg alt="..." src={require("assets/img/square-purple-1.png")} />
            <CardTitle tag="h6">{ this.props.name }</CardTitle>
          </CardHeader>
          <CardBody>Purchased on: { this.props.date } @ { this.props.price }</CardBody>
        </Card>
      </Col>
    );
  }
}

export default Purchase;