import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

// reactstrap components
import { Col, Button } from "reactstrap";

class Product extends React.Component {
  render() {
    return (
      <Col lg="4">
        <div className="info">
          <div>
            <img style={{ width: "100%", height: "300px" }} src={this.props.img} />
          </div>
          <h4 className="info-title">{this.props.name}</h4>
          <hr className="line-primary" />
          <p>{this.props.price}</p>
          <NavLink
            to={{
              pathname: "/view-product",
              data: { productId: this.props.id }
            }}
          >
            <Button className="btn-simple" color="primary" size="sm">
              <i className="tim-icons icon-book-bookmark" /> View
            </Button>
          </NavLink>
          <Button
            className="btn-simple"
            color="primary"
            size="sm"
            onClick={_ => {
              this.props.archiveProduct(this.props.id);
            }}
          >
            <i className="tim-icons icon-bulb-63" /> Archive
          </Button>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.user.id };
};

export default connect(mapStateToProps)(Product);
